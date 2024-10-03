// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { readFile } from 'node:fs/promises';
import { spec } from 'node:test/reporters';
import { run } from 'node:test';
import customReporter from './test/nodejs/reporter.js';
import express from 'express';
import template from './template.js';
import sendAlert from './server/alert.js';

let report = {};
let testNameChain = [];
let alertErrorMessage = '';

// 1. Synthesize doesn't do much. It executes a series of tests using the Node.js native test
// runner, stores the results as a JS object, and does stuff on test failure.
const synthesize = () => {
  console.info('Running tests...')
  run({
    globPatterns: ['test/nodejs/specs/**/*.js'],
    timeout: 3000,
  })
  .on('test:fail', data => {
    try {
      const isParent = testNameChain.length > 0;
      const isFirst = testNameChain.length === 0;
      const isLast = data.nesting === 0;
      testNameChain.unshift(`${'  '.repeat(data.nesting)}${isFirst ? '✘' : '➥'} ${data.name}`)
      if (!isParent && data.details.error.message) alertErrorMessage = data.details.error.message;
      if (isLast) {
        console.log(`\`\`\`\n${testNameChain.join('\n')}\n\`\`\``);
        console.log(alertErrorMessage);
        // sendAlert(`\`\`\`\n${testNameChain.join('\n')}\n\`\`\``, alertErrorMessage);
        testNameChain = [];
        alertErrorMessage = '';
      }
      // For something ongoing we wouldn't want to alert over and over over. So we could
      // introduce some basic state, similar to what Datadog does.
      // * on state change of FAIL->PASS: send error notification
      // * on state change of PASS->FAIL: send recovery notification  
    } catch (error) {
      console.error(error);
    }
  })
  // .on('test:complete', data => {
  //   console.log(data.testNumber, data.name, data.details.passed);
  // })
  .compose(customReporter)
  .on('data', async (data) => {
    console.info('Done.')
    report = data;
    // Schedule the next test run.
    // setTimeout(synthesize, 5000)
  })
}

synthesize();

// 2. After setting up the synthesizer, we can create a simple web server to serve the report.
// re: security, put this behind Okta? Do we need the express app at all, or could this service
// just send the data somewhere?
const app = express();

app.get('/', (req, res) => {
  // res.json(report)
  // res.sendFile('index.html', { root: import.meta.dirname })
  res.send(template(report))
})

app.get('/report.json', (req, res) => {
  res.json(report)
})

// app.use(
//   express.static(path.join(__dirname,'../public/'))
// )
  
app.listen(3000, () => {
  console.log('Server is up on 3000')
})


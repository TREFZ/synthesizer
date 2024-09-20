import { spec } from 'node:test/reporters';
import { run } from 'node:test';

const execute = () => {
  run({
    globPatterns: ['test/nodejs/**/*.js'],
  })
  .on('test:fail', () => {
    // Though for something ongoing we wouldn't want to alert over and over over. So we could
    // introduce some basic state, similar to what Datadog does.
    // * on state change of FAIL->PASS: send error notification
    // * on state change of PASS->FAIL: send recovery notification
    console.log('[FAIL]: This is where we could send a notifications via webhooks');
  })
  .compose(spec)
  .pipe(process.stdout)
}

execute()
setInterval(execute, 10000)

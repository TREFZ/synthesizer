// A custom reporter that converts the test stream to a JS object.
import parseReport from 'node-test-parser'

export default async function* jsonReporter(source) {
  const report = await parseReport(source)
  yield report;
}
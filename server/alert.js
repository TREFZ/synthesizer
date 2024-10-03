export default async function sendAlert(description = 'oops', errorMessage = '') {
  const { SLACK_WEBHOOK_URL } = process.env;
  if (!SLACK_WEBHOOK_URL) {
    console.error('SLACK_WEBHOOK_URL is not set in your environment variables')
    return
  }
  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Synthesizer',
      channel: 'nt-slack-notification-tests',
      // channel: 'releases-test',
      icon_emoji: ':musical_keyboard:',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: ':red_circle: Triggered: Synthesizer Test Failure'
          }
        },
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: 'The following test has failed'
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: description
          }
        },
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: 'with the error message:'
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `> ${errorMessage}`
          }
        }
      ]
    }),
  })
}

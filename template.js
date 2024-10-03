export default report => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Synthesizer</title>
    <script src="/alpine.min.js" defer></script>
    <link rel="stylesheet" href="/loader.min.css" type="text/css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
</head>
<body>
  <h1>Synthesizer</h1>
  ${report.tests.map(service => `
    <h2>${service.name}</h2>
    <ul>
      ${service.tests.map(test => `
        <li>
          <h3>${test.name}</h3>
          <p>${test.status}</p>
          <p>${test.error}</p>
        </li>
      `).join('')}
  `).join('')}
</body>
</html>
`
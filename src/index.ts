// src/index.js
const express = require('express');

const app = express();
const port = 3000;
app.get('/public/certificate/:cid', async (req, res) => {
  try {
    const response = await fetch(`https://api.dev.adroit-lms.com/certificate/v1/public/certificates/${req.params.cid}`);
    const data = await response.json();
    
    res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Certificate of Completion</title>
  <meta name="description" content="Congratulations! You have completed the ${data?.batchName} at ${data?.tenantName}." />
  <meta property="og:type" content="article" />
  <meta name="author" content="Xaltius" />
  <meta name="publisher" content="Xaltius" />
  <meta property="og:published_time" content="${data?.issuingDate}" />
  <meta property="og:image" content="${data?.certificateImageUrl}" />
  <meta property="og:title" content="Certificate of Completion - ${data?.batchName}" />
  <meta property="og:description" content="Congratulations! You have completed the ${data?.batchName}. Share your achievements with others." />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  <iframe src="https://demo.learner.dev.adroit-lms.com/public/certificate?cid=${req.params.cid}"></iframe>
</body>
</html>`);
  } catch (error) {
    console.error('Error fetching certificate data:', error);
    res.status(500).send('Error fetching certificate data');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
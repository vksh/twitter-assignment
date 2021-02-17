const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = 'AAAAAAAAAAAAAAAAAAAAAP9bMwEAAAAA%2BDIeKwNq5x7qKns11QMs3FpPbi0%3D3leArwDfl1Gdf7fQAcmwELqP4F4F29gAcauqjdbXeMGrj33tbQ';

const streamURL = 'https://api.twitter.com/2/tweets/sample/stream?expansions=author_id&user.fields=profile_image_url&tweet.fields=created_at';

function streamConnect() {
  const stream = needle.get(streamURL, {
    headers: {
      'User-Agent': 'v2SampleStreamJS',
      Authorization: `Bearer ${token}`
    },
    timeout: 20000
  });

  stream.on('data', data => {
    try {
      const json = JSON.parse(data);
      stream.emit('Data Received', json);
    } catch (e) {
      // Keep alive signal received. Do nothing.
    }
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
    stream.emit('Error fetching twitData', error);
  });

  return stream;
}

module.exports = streamConnect;

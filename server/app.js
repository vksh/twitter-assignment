const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fetchWrapper = require('./data-client/DataClient');
const streamConnect = require('./data-client/SampleStream');

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 4001;
const index = require('./route/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

let interval;

const getTwitTrends = async socket => {
  const response = await fetchWrapper.get(
    'https://api.twitter.com/1.1/trends/place.json?id=20070458'
  );
  if (response instanceof Error) {
    socket.emit('Error Fetching Trends');
  } else {
    socket.emit('Trends Updated', response);
  }
};

const twitData = [];

const getTwitData = async socket => {
  let twitDataInterval;
  let isPaused;
  const sampledStream = streamConnect();
  let timeout = 0;
  sampledStream.on('Data Received', data => {
    twitData.push(data);
  });
  sampledStream.on('Error fetching twitData', () => {
    socket.emit('TwitDataError');
  });
  socket.on('pause stream', () => {
    sampledStream.pause();
    isPaused = true;
  });
  socket.on('resume stream', () => {
    sampledStream.resume();
    isPaused = false;
  });
  if (twitDataInterval) {
    clearInterval(twitDataInterval);
  }
  twitDataInterval = setInterval(() => {
      if (!isPaused) {
        socket.emit('Twit Data received', twitData.shift());
      }
  }, 2000);
  sampledStream.on('timeout', () => {
    // Reconnect on error
    setTimeout(() => {
      timeout++;
      streamConnect();
    }, 2 ** timeout);
    streamConnect();
  });
};

io.on('connection', socket => {
  if (interval) {
    clearInterval(interval);
  }
  getTwitTrends(socket);
  getTwitData(socket);
  interval = setInterval(() => {
    getTwitTrends(socket);
  }, 10000);
  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Listening on port ${port}`));

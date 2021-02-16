const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

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

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit('FromAPI', response);
};

io.on('connection', socket => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

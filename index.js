const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join(__dirname, '/view')));
console.log(path.join(__dirname, '/view'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/client.html');
});

io.on('connection', (socket) => {
  console.log(socket.id, ': connected');
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  })
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    // broadcast to everyone else.
    socket.broadcast.emit('message', msg);
  });
});

server.listen(3002, () => {
  console.log('listening on *:3001');
});
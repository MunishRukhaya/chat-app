const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'static')))

io.on('connection', (socket) => {
    socket.on('user-joined', (message)=> {
        socket.broadcast.emit('user-joined', message);
    })
  socket.on('chat-message', (message)=> {
    socket.broadcast.emit('chat-message', message);
    console.log(message);
  })
});

io.on('disconnect', (socket) => {
  console.log('a user disconnected');
});

server.listen(process.env.PORT, () => {
  console.log('listening on *:5600');
});

require('dotenv').config();
const fs = require('fs');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express()
const server = http.Server(app);
const io = socketIo(server);
const port = process.env.PORT || 3001;

app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
    socket.on('nickname', (msg) => console.log(`user sends nickname: ${msg}`));
    socket.on('request_song', () => {
      const rand = Math.floor(Math.random() * playlist.length);
      const song = playlist[rand];
      console.log(`emitting: ${song.name} by ${song.artists}`);
      socket.emit('give_song', JSON.stringify(song));
    });
});

server.listen(port, () => console.log(`listening on port ${port}`));

const playlist = JSON.parse(fs.readFileSync('./playlists.json')).popList;

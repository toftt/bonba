require('dotenv').config();
const fs = require('fs');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express()
const server = http.Server(app);
const io = socketIo(server);
const port = process.env.PORT || 3001;

const playlist = JSON.parse(fs.readFileSync('./playlists.json')).popList;

let currentSong;
const setRandomSong = () => {
  const rand = Math.floor(Math.random() * playlist.length);
  currentSong = playlist[rand];
  console.log(`setting new track: ${currentSong.artists} -- ${currentSong.name}`);
  io.emit('current_track', currentSong.preview_url);
};

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
    socket.on('nickname', (msg) => console.log(`user sends nickname: ${msg}`));
    socket.on('current_track', () => {
      socket.emit('current_track', currentSong.preview_url);
    });
    socket.on('guess_artist', (artist) => {
      console.log(`guess artist: ${artist}`);
      if (artist.toLowerCase() === currentSong.artists[0].toLowerCase()) socket.emit('correct_artist', currentSong.artists[0]);
      else socket.emit('incorrect_artist');
    });
    socket.on('guess_track', (track) => {
      console.log(`guess track: ${track}`);
      if (track.toLowerCase() === currentSong.name.toLowerCase()) socket.emit('correct_track', currentSong.name);
      else socket.emit('incorrect_track');
    });
});

setRandomSong();
setInterval(setRandomSong, 30000);
server.listen(port, () => console.log(`listening on port ${port}`));

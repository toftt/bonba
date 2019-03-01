const fs = require('fs');
const Game = require('./game.js');

const playlist = JSON.parse(fs.readFileSync('./playlists.json')).popList;

const getRandomTrack = () => {
  const rand = Math.floor(Math.random() * playlist.length);
  //console.log(`setting new track: ${currentSong.artists} -- ${currentSong.name}`);
  return playlist[rand];
};

const configureIo = (io) => {
    const game = new Game();

    io.on('connection', (socket) => {
        game.newUser(socket.id);
        socket.emit('game_state', JSON.stringify(game.getGameState()));

        socket.on('guess_artist', (artist) => {
          const correct = game.guess(artist, socket.id, 'artist');
          if (correct) socket.emit('correct_artist');
          else socket.emit('incorrect_artist');
        });

        socket.on('guess_track', (track) => {
          const correct = game.guess(track, socket.id, 'track');
          if (correct) socket.emit('correct_track');
          else socket.emit('incorrect_track');
        });

        socket.on('nickname', (nickname) => {
          game.setNickname(socket.id, nickname);
        });

        socket.on('disconnect', () => {
          game.deleteUser(socket.id);
        });
    });

    const updateTrack = () => {
      const currentTrack = getRandomTrack();
      game.startNewRound(currentTrack);
      const gameState = JSON.stringify(game.getGameState());
      console.log(`setting new track: ${currentTrack.artists} -- ${currentTrack.name}`);
      io.emit('game_state', gameState);
    }

    updateTrack();
    setInterval(updateTrack, 30000);
}

module.exports = configureIo;
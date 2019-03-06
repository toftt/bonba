const fs = require('fs');
const Game = require('./game.js');
const builder = require('./NicknameBuilder')(); 

const playlist = JSON.parse(fs.readFileSync('./playlists.json')).popList;

const getRandomTrack = () => {
  const rand = Math.floor(Math.random() * playlist.length);
  return playlist[rand];
};

const configureIo = (io) => {
    const game = new Game();

    io.on('connection', (socket) => {
        game.newUser(socket.id);
        game.setNickname(socket.id, builder.getNickname());

        socket.emit('game_state', JSON.stringify(game.getGameState()));
        socket.broadcast.emit('user_update', JSON.stringify(game.users));

        socket.on('guess_artist', (artistGuess) => {
          const artists = game.guess(artistGuess, socket.id, 'artists');
          if (artists) {
            socket.emit('correct_artist', artists);
            io.emit('user_update', JSON.stringify(game.users));
          }
          else socket.emit('incorrect_artist');
        });

        socket.on('guess_track', (trackGuess) => {
          const track = game.guess(trackGuess, socket.id, 'name');
          if (track) {
            socket.emit('correct_track', track);
            io.emit('user_update', JSON.stringify(game.users));
          } 
          else socket.emit('incorrect_track');
        });

        socket.on('nickname', (nickname) => {
          game.setNickname(socket.id, nickname);
        });

        socket.on('disconnect', () => {
          game.deleteUser(socket.id);
          socket.broadcast.emit('user_update', JSON.stringify(game.users));
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
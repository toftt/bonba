class Game {

    constructor() {
        this.users = {};
        this.trackHistory = [];
        this.currentTrack = {};
        this.guesses = {};
        this.timeStamp = 0;
        this.currentRound = 0;
    }

    newUser(userId) {
        this.users[userId] = {'nickname': userId, 'score': 0};
    }

    deleteUser(userId) {
        delete this.users[userId];
    }

    startNewRound(track) {
        this.timeStamp = (new Date()).getTime();
        if (this.currentRound !== 0) this.trackHistory.push({ track: this.currentTrack, round: this.currentRound });
        this.currentTrack = track;
        this.currentRound++;
    }

    getGameState() {
        const remainingTime = this.getRemainingTime();
        return {
            users: this.users, 
            trackHistory: this.trackHistory, 
            currentTrack: this.currentTrack.preview_url, 
            remainingTime
        };
    }

    getRemainingTime() {
        const time = ((new Date()).getTime() - this.timeStamp) / 1000;
        console.log(time);
        return time;
    }

    resetTrackHistory() {
        this.trackHistory = [];
    }

    guess(guess, userId, what) {
        console.log(`${userId} guessed ${what} = ${guess}, answer = ${this.currentTrack[what][0]}`);
        if (guess == this.currentTrack[what]) {
            this.users[userId].score++;
            return this.currentTrack[what];
        }

        return false;
    }

    setNickname(userId, nickname) {
        this.users[userId].nickname = nickname;
    }
}

module.exports = Game;
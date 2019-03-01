class Game {

    constructor() {
        this.users = {};
        this.trackHistory = [];
        this.currentTrack = {};
        this.guesses = {};
        this.timeStamp = 0;
        this.currentRound = 1;
    }

    newUser(userId) {
        this.users[userId] = {'nickname': userId, 'score': 0};
    }

    deleteUser(userId) {
        delete this.users[userId];
    }

    startNewRound(track) {
        this.timeStamp = (new Date()).getTime();
        this.trackHistory.push(this.currentTrack);
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
        return ((new Date()).getTime - this.timeStamp) / 1000;
    }

    resetTrackHistory() {
        this.trackHistory = [];
    }

    guess(guess, userId, what) {
        if (guess == this.currentTrack[what]) {
            this.users[userId].score++;
            return true;
        }

        return false;
    }

    setNickname(userId, nickname) {
        this.users[userId].nickname = nickname;
    }
}

module.exports = Game;
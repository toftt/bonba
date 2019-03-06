const levenshtein = require('js-levenshtein');

const checkTrackGuess = (guess, answer) => {
    const a = guess.toLowerCase();
    const b = answer.toLowerCase();

    if (levenshtein(a, b) <= 2) return true;

    const withinParamExp = /\(.+\)/;

    const stripExtra = b.replace(withinParamExp, '');

    return levenshtein(a, stripExtra) <= 2;
};

const checkArtistGuess = (guess, artists) => {
    const lcGuess = guess.toLowerCase();
    const lcArtists = artists.map(artist => artist.toLowerCase());

    for (let i = 0; i < lcArtists.length; i++) {
        if (levenshtein(lcGuess, lcArtists[i]) <= 2) return true;
    }

    return false;
};

module.exports = { checkArtistGuess, checkTrackGuess };
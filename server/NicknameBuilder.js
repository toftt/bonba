const fs = require('fs');
const path = require('path');

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1); 

const NicknameBuilder = () => {
    const eolExp = /\r?\n/;

    const adjectives = fs.readFileSync(path.resolve(__dirname, 'adjectives.txt'), 'utf8').split(eolExp);
    const animals = fs.readFileSync(path.resolve(__dirname, 'animals.txt'), 'utf8').split(eolExp);


    const getNickname = () => {
        const adjPos = Math.floor(Math.random() * adjectives.length);
        const aniPos = Math.floor(Math.random() * animals.length);

        const adjective = adjectives[adjPos].toUpperCase();
        const animal = animals[aniPos].toUpperCase();

        return `${adjective} ${animal}`;
    };

    return { getNickname };
};

module.exports = NicknameBuilder;
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const playlists = JSON.parse(fs.readFileSync('./playlists.json'));
console.log(playlists);

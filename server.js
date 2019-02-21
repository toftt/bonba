const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const encodedPayload = Buffer
                        .from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
                        .toString('base64');
let access_token = '';
let popList = [];
let hiphopList = [];
let rockList = [];
let mixedList = [];

axios('https://accounts.spotify.com/api/token', {
    headers: {
        'Authorization': 'Basic ' + encodedPayload,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
        grant_type: 'client_credentials'
    },
    method: 'post'
})
.then((res) => {
    access_token = res.data.access_token;
    loadPlaylist('https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks', popList);
    loadPlaylist('https://api.spotify.com/v1/playlists/3cqW3anXmlCrmKAksZ4xfE/tracks', popList);
    loadPlaylist('https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks', rockList);
    loadPlaylist('https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks', mixedList);
})
.catch((error) => console.log(error));

const loadPlaylist = (playlistUrl, genreList) => {
    axios(playlistUrl,
    {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    .then((res) => {
        load(res, genreList);
    })
    .catch((err) => console.log(err))
}

const load = (res, genreList) => {
    let playlist = sanitize(res.data.items);
    playlist.filter((data) => {
        let artists = data.track.artists.reduce((a, curr) => {
            a.push(curr.name);
            return a;
        }, []);

        let obj = {
            artists: artists,
            name: data.track.name,
            preview_url: data.track.preview_url
        }

        genreList.push(obj);
    });
}
const sanitize = (arr) => {
    return arr.filter(data => data.track)
}

setTimeout(() => console.log(popList.length), 5000)

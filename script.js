const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

let access_token = '';

const initPlaylists = () => {
    let popList = [];
    let hiphopList = [];
    let rockList = [];
    let mixedList = [];

    const encodedPayload = Buffer
                            .from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
                            .toString('base64');

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
    .then(async (res) => {
        access_token = res.data.access_token;
        await loadPlaylist('https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks', popList);
        await loadPlaylist('https://api.spotify.com/v1/playlists/3cqW3anXmlCrmKAksZ4xfE/tracks', popList);
        await loadPlaylist('https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks', rockList);
        await loadPlaylist('https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu/tracks', mixedList);
        fs.writeFileSync('playlists.json', JSON.stringify({ popList }));
    })
    .catch((error) => console.log(error));
}

const loadPlaylist = (playlistUrl, genreList) => {
    return axios(playlistUrl,
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
    playlist.forEach((data) => {
        if (!data.track.preview_url) return;
        let artists = data.track.artists.reduce((a, curr) => {
            a.push(curr.name);
            return a;
        }, []);

        let obj = {
            artists: artists,
            name: data.track.name,
            preview_url: data.track.preview_url,
            image: data.track.album.images[2].url
        }

        genreList.push(obj);
    });
}
const sanitize = (arr) => {
    return arr.filter(data => data.track)
}

initPlaylists();

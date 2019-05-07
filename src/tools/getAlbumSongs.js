const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const teamId = process.env.REACT_APP_TEAM_ID;
const keyId = process.env.REACT_APP_KEY_ID;

const { privateKeyId } = process.env.PRIVATE_KEY_ID || require('../env');

const jwtToken = jwt.sign({}, privateKeyId, {
  algorithm: "ES256",
  expiresIn: "180d",
  issuer: teamId,
  header: {
    alg: "ES256",
    kid: keyId
  }
});

const headers = {
  Authorization: `Bearer ${jwtToken}`
}

const query = 'ray of light';

// for a search query
const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs`;

fetch(searchUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  .then((json) => {

    console.log(`${json.results.songs.data.length} total songs returned`)
    const songs = json.results.songs.data;

    let matches = 0;
    let albumSongs = [];
    songs.map((song) => {
      if (song.attributes.albumName.toLowerCase() === query) {
        matches++;
        console.log(song.attributes.name);
        albumSongs.push(song);
      }
    })
    console.log(`${matches} matching songs`)

    console.log(albumSongs.length)
    let sortedSongs = [];  

    for ( let i=1; i < albumSongs.length+1; i++ ) {
      console.log(`checking ${i}`)
      albumSongs.forEach((song) => {
        if (i === song.attributes.trackNumber) {
          sortedSongs.push([song.attributes.name, song.attributes.trackNumber])
        }
      });
    }
    console.log(sortedSongs)
  })
  .catch((e) => console.log(e))
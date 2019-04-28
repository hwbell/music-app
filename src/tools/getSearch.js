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

const query = 'roxy music';

// for a search query
const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,albums,music-videos`;

fetch(searchUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  // for searches
  // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

  // for charts
  .then((json) => {

    let albums = json.results.albums.data;
    let songs = json.results.songs.data;

    console.log(albums.length + " albums returned");
    console.log(songs.length + " artists returned")

    console.log(`*************************Top Songs***********************`);

    console.log(songs[0].attributes)
    let songData = songs.map((song, i) => {
      let { name, url, genreNames } = song.attributes;
      return {
        name,
        url,
        genreNames
      }
    })

    // console.log(songData);

    console.log(`**********************************************************`);

    console.log(`*************************Top Music Videos***********************`);

    console.log(albums[0].attributes)
    let albumData = albums.map((album, i) => {
      let { artwork, artistName, url, genreNames } = album.attributes;
      return {
        artwork,
        artistName,
        url,
        genreNames
      }
    })

    // console.log(albumData);
    console.log(`**********************************************************`);

    console.log('**********************************************************');
    console.log(json.results['music-videos'].data[0].attributes)
    console.log('**********************************************************');


  })
  .catch((e) => console.log(e))
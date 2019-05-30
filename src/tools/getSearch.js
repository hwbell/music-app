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

// for a search query
const query = 'pop';
const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,albums,artists,playlists`;

// for a playlist query
const id = `pl.5ee8333dbe944d9f9151e97d92d1ead9`;
const playlistUrl = `https://api.music.apple.com/v1/catalog/us/playlists/${id}`;

fetch(playlistUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  // for searches
  // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

  // for charts
  .then((json) => {

    console.log(json.data[0].attributes)

    // let songs = json.results.songs.data;
    // let albums = json.results.albums.data;
    // let artists = json.results.artists.data;

    // let { songs, albums, artists, playlists } = json.results;

    // let definedData = {};

    // [songs, albums, artists, playlists].forEach((obj) => {
    //   // check if it is defined
    //   if (obj) {
    //     let { data } = obj;
    //     let { type } = data[0];

    //     console.log(`*************************Top ${type}***********************`);
    //     console.log(`${data.length} ${type} returned`)

    //     console.log('first album')
    //     console.log(data[0])
    //     console.log(`**********************************************************`);

    //     // throw it in the object with its type as the key name
    //     definedData[`${type}`] = data;
    //   }

    // });
    // console.log(definedData.songs);
  })
  .catch((e) => console.log(e))
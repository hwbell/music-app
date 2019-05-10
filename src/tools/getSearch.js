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

const query = 'stop making sense';

// for a search query
const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,albums,artists`;

fetch(searchUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  // for searches
  // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

  // for charts
  .then((json) => {

    // console.log(json)

    // let songs = json.results.songs.data;
    // let albums = json.results.albums.data;
    // let artists = json.results.artists.data;

    let { songs, albums, artists } = json.results;

    let definedData = {};

    [songs, albums, artists].forEach((obj) => {
      // check if it is defined
      if (obj) {
        let { data } = obj;
        let { type } = data[0];

        console.log(`*************************Top ${type}***********************`);
        console.log(`${data.length} ${type} returned`)
        console.log(`**********************************************************`);

        // throw it in the object with its type as the property name
        definedData[`${type}`] = data;
      }

    });
    // console.log(definedData.songs);
  })
  .catch((e) => console.log(e))
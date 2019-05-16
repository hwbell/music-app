
const { privateKeyId } = require('../env');

const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

const teamId = process.env.REACT_APP_TEAM_ID;
const keyId = process.env.REACT_APP_KEY_ID;

const jwtToken = jwt.sign({}, privateKeyId, {
  algorithm: "ES256",
  expiresIn: "180d",
  issuer: teamId,
  header: {
    alg: "ES256",
    kid: keyId
  }
});

console.log(jwtToken);

const headers = {
  Authorization: `Bearer ${jwtToken}`
}

// for a charts query
const chartsUrl = 'https://api.music.apple.com/v1/catalog/us/charts?types=songs,albums,music-videos&limit=100';


fetch(chartsUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  // for searches
  // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

  // for charts
  .then((json) => {

    console.log(json.results.songs[0].data[0].attributes.previews)

    

  })
  .catch((e) => console.log(e))
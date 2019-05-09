const {convertMillisToStandard} = require('../tools/functions');

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

// need identifier, can't fetch with name
const query = '310730204';

// for an album query
const searchUrl = `https://api.music.apple.com/v1/catalog/us/albums/${query}`;

fetch(searchUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  .then((json) => {

    console.log(json.data[0].relationships.tracks.data)
  })
  .catch((e) => console.log(e))
const jwt = require("jsonwebtoken");

// the private stuff

// const { privateKeyId } = require('../env');

// get the key from env.js in local or process.env.REACT_APP_PRIVATE_KEY_ID on heroku 
let privateKeyId;
if ( process.env.REACT_APP_PRIVATE_KEY_ID ) {
  privateKeyId = process.env.REACT_APP_PRIVATE_KEY_ID;
} else {
  privateKeyId = require('../env').privateKeyId;
}

const teamId = process.env.REACT_APP_TEAM_ID;
const keyId = process.env.REACT_APP_KEY_ID;

const getWebToken = () => {
  // sign a token with the private stuff for auth to apple's api
  const jwtToken = jwt.sign({}, privateKeyId, {
    algorithm: "ES256",
    expiresIn: "180d",
    issuer: teamId,
    header: {
      alg: "ES256",
      kid: keyId
    }
  });

  return jwtToken;
}

module.exports = {
  getWebToken
}
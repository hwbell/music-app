const jwt = require("jsonwebtoken");

// the private stuff

const { privateKeyId } = require('../env');
// console.log('key: ' + privateKeyId)
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
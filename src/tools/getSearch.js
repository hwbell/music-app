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
const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,albums,artists,playlists`;

fetch(searchUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  // for searches
  // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

  // for charts
  .then((json) => {

    // console.log(json.results.albums.data)

    let songs = json.results.songs.data;
    let albums = json.results.albums.data;
    let artists = json.results.artists.data;
    let playlists = json.results.playlists.data;

    console.log(songs.length + " songs returned");
    console.log(albums.length + " albums returned");
    console.log(artists.length + " artists returned");
    console.log(playlists.length + " playlists returned");

    [songs, albums, artists, playlists].forEach((obj) => {
      console.log(`*************************Top ${obj[0].type}***********************`);

      console.log(obj[0].attributes);
      
      let songData = obj.map((item, i) => {
        let { name, url, genreNames } = item.attributes;
        let { id, type, href, attributes } = item;
        return {
          name,
          url,
          genreNames
        }
      })

      console.log(`**********************************************************`);
    });

  })
  .catch((e) => console.log(e))
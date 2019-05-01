
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
const chartsUrl = 'https://api.music.apple.com/v1/catalog/us/charts?types=songs,albums,music-videos&genre=20&limit=10';


fetch(chartsUrl, {
  method: 'GET',
  headers
})
  .then(res => res.json())
  // for searches
  // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

  // for charts
  .then((json) => {

    let albums = json.results.albums[0].data;
    let songs = json.results.songs[0].data;

    console.log(albums.length + " albums returned");
    console.log(songs.length + " songs returned")

    console.log(`*************************Top Albums***********************`);
    
    let albumData = albums.map( (album, i) => {
        let { id } = album;
      let { name, url, artwork, artistName, releaseDate, editorialNotes } = album.attributes;
      return {
        id,
        url,
        name,
        artwork,
        artistName,
        releaseDate,
        editorialNotes
      }
    })

    // let artUrl = albumData[0].artwork.url;
    // let slicePoint = artUrl.indexOf("{w}");

    // console.log(albumData[0].artwork.url.slice(0, slicePoint))

    console.log(`**********************************************************`);

    console.log(`*************************Top Songs***********************`);
    
    let songData = songs.map( (song, i) => {
      let { id } = song;
      let { url, name, artwork, artistName, durationInMillis } = song.attributes;
      return {
        id,
        url, 
        name,
        artwork,
        artistName,
        durationInMillis,
      }
    })
    // console.log(json.results.songs[0].data[0].attributes.artwork)
    // console.log(songData)

    console.log(`**********************************************************`);

  })
  .catch((e) => console.log(e))
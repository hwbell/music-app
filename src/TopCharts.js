import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

// tools
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

// the private stuff

const { privateKeyId } = require('../env');
// console.log('key: ' + privateKeyId)
const teamId = process.env.REACT_APP_TEAM_ID;
const keyId = process.env.REACT_APP_KEY_ID;

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

// 
class TopCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderCard = this.renderCard.bind(this);
  }

  componentDidMount() {
    this.fetchTopCharts();
  }

  // for the Top song and album
  fetchTopCharts() {

    // this is the form specified by apple
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }

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

        let topAlbumsData = albums.map((album, i) => {
          let { id } = album;
          let { name, url, artwork, artistName, releaseDate, editorialNotes } = album.attributes;
          return {
            type: 'album',
            id, url, name, artwork, artistName, releaseDate, editorialNotes
          }
        });
        // console.log(albumData[0])

        console.log(`**********************************************************`);

        console.log(`*************************Top Songs***********************`);

        let topSongsData = songs.map((song, i) => {
          let { id } = song;
          let { url, name, artwork, artistName, durationInMillis } = song.attributes;
          return {
            type: 'song',
            id, url, name, artwork, artistName, durationInMillis,
          }
        });
        // console.log(songData[0])

        console.log(`**********************************************************`);

        // save the fetch results to state. shouldn't have to change these once we fetch
        this.setState({
          topAlbumsData,
          topSongsData
        })

      })
      .catch((e) => console.log(e))

  }

  // for each of the two top cards, #1 album and #1 song
  renderCard(props) {

    console.log(props)
    let artUrl = props.artwork.url;

    // slice off the ending '{w}x{h}bb.jpeg' part of the url. we can replace it
    // with '200x200bb.jpeg' for example. width + height can be assigned.
    let slicePoint = artUrl.indexOf('{w}');

    let picUrl = artUrl.slice(0, slicePoint) + '1000x1000bb.jpeg';

    return (
      <div className="col-12 col-sm-6" style={styles.cardContainer}>
        <Card style={{ border: 'none' }}>
          <CardImg style={styles.cardImg} src={picUrl} alt="Card image cap" />
          <CardImgOverlay>

            <CardTitle style={styles.cardTitle}># 1 {props.type}</CardTitle>
            <CardText style={styles.cardText}>{props.name}</CardText>

          </CardImgOverlay>
        </Card>
      </div>
    )
  }

  // for the main Icon / Logo
  renderIcon() {
    return (
      <div className="col-4">

        <img src={'https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/itunes_5122x.png'} className="App-logo" alt="logo" />
      </div>
    )
  }



  render() {
    return (

      <div className="row" style={styles.container}>

        <div className="col-8">

          <div className="row">

            {this.state.topAlbumsData && this.renderCard(this.state.topAlbumsData[0])}

            {this.state.topSongsData && this.renderCard(this.state.topSongsData[0])}

          </div>

        </div>

        {this.renderIcon()}

      </div>

    );
  }
}

const styles = {
  container: {

  },
  cardContainer: {
    maxHeight: '300px',
    // width: '200px'
  },
  cardImg: {
    width: '240px',
    height: '240px',
    margin: '15px auto'
  },
  cardText: {
    textAlign: 'left',
    color: 'white',
    fontSize: '24px',
    margin: '15px',
    marginLeft: '30px'
  },
  cardTitle: {
    textAlign: 'left',
    color: 'white',
    margin: '15px'
  }
}

export default TopCharts;



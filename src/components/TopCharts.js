import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import Title from '../components/Title';

// tools
import { getWebToken } from '../tools/getWebToken';
const fetch = require("node-fetch");

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
    let jwtToken = getWebToken();
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
    // with '200x200bb.jpeg' for example. width + height can be assigned this way
    let slicePoint = artUrl.indexOf('{w}');

    let picUrl = artUrl.slice(0, slicePoint) + '1000x1000bb.jpeg';

    return (
      <div className="col-sm-6" style={styles.cardContainer}>
        <Card style={{ border: 'none' }}>
          <CardImg style={styles.cardImg} src={picUrl} alt="Card image cap" />
          <CardImgOverlay style={styles.imageOverlay}>

            <CardTitle style={styles.cardTitle}>featured {props.type}</CardTitle>
            <CardText style={styles.cardText}>{props.name.toLowerCase()}</CardText>
            <CardText style={styles.cardTitle}>{props.artistName}</CardText>

          </CardImgOverlay>
        </Card>
      </div>
    )
  }

  // for the main Icon / Logo
  renderIcon() {
    return (
      <div className="col" style={styles.cardContainer}>

        <img style={styles.logo} src={'https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/itunes_5122x.png'} className="" alt="logo" />
      </div>
    )
  }



  render() {
    return (

      <div className="" style={styles.container}>

        <Title text="explore more music"/>

        <div className="row" style={styles.cardsHolder}>

          {this.state.topAlbumsData && this.renderCard(this.state.topAlbumsData[7])}

          {this.state.topSongsData && this.renderCard(this.state.topSongsData[7])}

        </div>


        {/* {this.renderIcon()} */}

      </div>

    );
  }
}

const styles = {
  container: {
    padding: '5px'
  },
  cardsHolder: {
    // maxWidth: '900px',
    margin: 'auto auto'
    // minWidth: '300px'
  },
  cardContainer: {
    minWidth: '350px',
    maxWidth: '600px',
    margin: 'auto auto'
    // height: '300px',
  },
  cardImg: {
    width: '100%',
    // height: '260px',
  },
  imageOverlay: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  cardText: {
    textAlign: 'center',
    color: 'white',
    fontSize: '26px',
    // margin: 'auto auto'
  },
  cardTitle: {
    textAlign: 'center',
    color: 'white',
    // margin: 'auto auto',
    // margin: 'auto auto'
  },
  logo: {
    width: '240px',
    height: '240px',
  }

}

export default TopCharts;



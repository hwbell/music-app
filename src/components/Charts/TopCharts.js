import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import Title from '../Title';

// tools
import { getWebToken } from '../../tools/getWebToken';
import Featured from './Featured';
import CardCarousel from './CardCarousel';
const fetch = require("node-fetch");

// TopCharts is the master component for everything derived from pure api data
// without any input from the user, or anything outside of the search
class TopCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    
    this.fetchTopCharts = this.fetchTopCharts.bind(this);
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

    const chartsUrl = 'https://api.music.apple.com/v1/catalog/us/charts?types=songs,albums,music-videos&genre=20&limit=100';

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

        <Title className="title-charts" text="explore more music"/>
        
        {/* the two top cards */}
        { this.state.topAlbumsData && this.state.topSongsData &&
          <Featured topAlbumsData={this.state.topAlbumsData} topSongsData={this.state.topSongsData}/>}
        
        {/* carousel of mixed albums */}
        { this.state.topAlbumsData && 
          <CardCarousel type="Albums" data={this.state.topAlbumsData}/>}

        {/* carousel of mixed albums */}
        { this.state.topSongsData && 
          <CardCarousel type="Songs" data={this.state.topSongsData}/>}


        {/* {this.renderIcon()} */}

      </div>

    );
  }
}

const styles = {
  container: {
    padding: '5px',
  },
  
  logo: {
    width: '240px',
    height: '240px',
  }

}

export default TopCharts;



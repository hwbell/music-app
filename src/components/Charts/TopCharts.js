import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import Featured from './Featured';
import TopHundred from './TopHundred';

// tools
import { getWebToken } from '../../tools/getWebToken';

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

        let albums = json.results.albums[0].data;
        let songs = json.results.songs[0].data;
        let videos = json.results['music-videos'][0].data;

        // console.log(albums.length + " albums returned");
        // console.log(songs.length + " songs returned");
        // console.log(videos.length + " videos returned");

        // console.log(`*************************Top Albums***********************`);

        let topAlbumsData = albums.map((album, i) => {
          let { id } = album;
          let { name, url, artwork, artistName, releaseDate, editorialNotes } = album.attributes;
          return {
            type: 'album',
            id, url, name, artwork, artistName, releaseDate, editorialNotes
          }
        });
        // console.log(albumData[0])

        // console.log(`**********************************************************`);

        // console.log(`*************************Top Songs***********************`);

        let topSongsData = songs.map((song, i) => {
          let { id } = song;
          let { previews, url, name, artwork, artistName, durationInMillis } = song.attributes;
          return {
            type: 'song',
            previews, id, url, name, artwork, artistName, durationInMillis,
          }
        });
        // console.log(songData[0])

        // console.log(`**********************************************************`);

        // console.log(`*************************Top Videos***********************`);

        let topVideosData = videos.map((video, i) => {
          let { id } = video;
          let { previews, url, name, artwork, artistName, durationInMillis } = video.attributes;
          return {
            type: 'music video',

            previews, id, url, name, artwork, artistName, durationInMillis,
          }
        });
        // console.log(songData[0])

        // console.log(`**********************************************************`);

        // save the fetch results to state. shouldn't have to change these once we fetch
        this.setState({
          topAlbumsData,
          topSongsData,
          topVideosData
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

      <div className="" id="browse" style={styles.container}>

        {/* the top 100 list for songs / ablums */}
        {this.state.topAlbumsData && this.state.topSongsData &&
          <TopHundred
            topAlbumsData={this.state.topAlbumsData}
            topSongsData={this.state.topSongsData} 
            handleSongChange={this.props.handleSongChange}
            />}

        {/* the two top feature cards - music video / song */}
        {this.state.topVideosData && this.state.topSongsData &&
          <Featured topVideosData={this.state.topVideosData}
            topSongsData={this.state.topSongsData} />}

        {/* {this.renderIcon()} */}

      </div>

    );
  }
}

const styles = {
  container: {
    margin: '40px auto',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: '240px',
    height: '240px',
  }

}

export default TopCharts;



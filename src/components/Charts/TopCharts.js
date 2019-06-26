import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import Featured from './Featured';
import TopHundred from './TopHundred';
import MusicVideos from "../Search/MusicVideos";
// tools
import { getWebToken } from '../../tools/getWebToken';
import Title from '../Title';

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

    const chartsUrl = 'https://api.music.apple.com/v1/catalog/us/charts?types=songs,albums,music-videos,playlists&limit=100';

    fetch(chartsUrl, {
      method: 'GET',
      headers
    })
      .then(res => res.json())
      // for searches
      // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

      // for charts
      .then((json) => {

        let topAlbumsData = json.results.albums[0].data;
        let topSongsData = json.results.songs[0].data;
        let topVideosData = json.results['music-videos'][0].data;
        
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

        <Title text={"Trending Right Now"} color="rgb(221, 21, 98)"/>

        {/* the top 100 list for songs / ablums */}
        {this.state.topAlbumsData && this.state.topSongsData &&
          <TopHundred
            topAlbumsData={this.state.topAlbumsData}
            topSongsData={this.state.topSongsData}
            handleSongChange={this.props.handleSongChange}
          />}

        {/* the two top feature cards - music video / song */}
        {/* {this.state.topVideosData && this.state.topSongsData &&
          <MusicVideos 
            videosData={[this.state.topSongsData[0], this.state.topVideosData[0]]} 
            sectionTitles={['Featured Song', 'Featured Video']}  
            />} */}

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



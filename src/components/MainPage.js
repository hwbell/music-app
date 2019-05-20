import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';


// components
import Navigator from './Navigator';
import Header from './Header';
import Footer from './Footer';
import TopCharts from './Charts/TopCharts';
import Search from './Search/Search';
import ReactAudioPlayer from 'react-audio-player';
import VideoPlayer from './VideoPlayer';
import {Button} from 'reactstrap';

// initial state for the component

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songPlaying: false,
      videoPlaying: false
    };
    this.handleSongChange = this.handleSongChange.bind(this);
    // this.handleVideoChange = this.handleVideoChange.bind(this);
  }

  componentDidMount() {
    // fetch the chart data and search data to start
  }

  handleSongChange(songUrl, info) {
    this.setState({
      songPlaying: true,
      songPlayingUrl: songUrl,
      songPlayingInfo: info
    });
  }

  // handleVideoChange(picUrl, videoUrl, info) {
  //   this.setState({
  //     videoPlaying: true,
  //     videoPlayingPicUrl: picUrl,
  //     videoPlayingPreviewUrl: videoUrl,
  //     videoPlayingInfo: info
  //   });
  // }

  render() {
    return (
      <div className="main-page">


        <Header />
        {/* display the top song and album of the day, with the main icon */}

        <Navigator />

        {/* display the search bar / results */}
        <Search handleSongChange={this.handleSongChange} />

        <hr></hr>

        {/* display the search bar / results */}
        <TopCharts handleSongChange={this.handleSongChange} />

        {/* display the audio player at the bottom */}
        {this.state.songPlaying &&
          <div style={styles.audioHolder}>
            <Button className="float-right" 
              color="link" 
              onClick={() => this.setState({songPlaying: false})}>
              
              <i className="fas fa-times-circle"></i>
            </Button>

            <p style={styles.audioText}>{this.state.songPlayingInfo}</p>
            <ReactAudioPlayer
              style={styles.audioPlayer}
              src={this.state.songPlayingUrl}
              autoPlay
              controls
            />
          </div>}

        {/* display the video player at the bottom */}
        {/* {this.state.videoPlaying &&
          <div style={styles.videoHolder}>
            <p>{this.state.videoPlayingInfo}</p>
            <VideoPlayer picUrl={this.state.videoPlayingPicUrl} 
              previewUrl={this.state.videoPlayingPreviewUrl} style={{ width: '100%' }} />
          </div>} */}

        <Footer />

      </div>
    );
  }
}

const styles = {
  audioHolder: {
    // zIndex: 3,
    position: 'fixed',
    bottom: '5px',
    left: '10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: '25px',
    minWidth: '250px'
  },
  audioPlayer: {
    margin: '10px',
    // width: '90%'
  },
  audioText: {
    margin: '10px',
    color: 'white'
  },

  videoHolder: {
    zIndex: 3,
    position: 'fixed',
    bottom: '5px',
    right: '10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: '25px',
    minWidth: '300px'
  },
}

export default MainPage;

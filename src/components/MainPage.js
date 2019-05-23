import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';


// components
import Navigator from './Navigator';
import Header from './Header';
import Footer from './Footer';
import TopCharts from './Charts/TopCharts';
import Search from './Search/Search';
import AudioPlayer from './AudioPlayer';
import { PoseGroup } from 'react-pose';

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songPlaying: false,
      videoPlaying: false
    };
    this.handleSongChange = this.handleSongChange.bind(this);
    this.closeAudioPlayer = this.closeAudioPlayer.bind(this);
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

  closeAudioPlayer() {
    console.log('closing audio')
    this.setState({ songPlaying: false });
    console.log('state set')
  }

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

        {/* <PoseGroup> */}
        {this.state.songPlaying &&

          <AudioPlayer key="audio"
            info={this.state.songPlayingInfo}
            url={this.state.songPlayingUrl}
            handleClick={this.closeAudioPlayer}
          />}
        {/* </PoseGroup> */}

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

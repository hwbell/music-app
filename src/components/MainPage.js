import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';


// components
import Navigator from './Navigator';
import Header from './Header';
import TopCharts from './Charts/TopCharts';
import Search from './Search/Search';
import ReactAudioPlayer from 'react-audio-player';


// initial state for the component

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      musicPlaying: false
    };
    this.handleSongChange = this.handleSongChange.bind(this);
  }

  componentDidMount() {
    // fetch the chart data and search data to start
  }

  handleSongChange (songUrl) {
    this.setState({
      musicPlaying: true,
      songToPlay: songUrl
    })
  }

  render() {
    return (
      <div className="main-page">


        <Header />
        {/* display the top song and album of the day, with the main icon */}

        <Navigator />

        <TopCharts handleSongChange={this.handleSongChange}/>

        <hr></hr>

        {/* display the search bar / results */}
        <Search handleSongChange={this.handleSongChange}/>

        {/* display the audio player at the bottom */}
        {this.state.musicPlaying &&
          <ReactAudioPlayer
            className="text-center"
            style={styles.audioPlayer}
            // src={'https://video-ssl.itunes.apple.com/itunes-assets/Video123/v4/60/16/4b/60164bd6-e1d6-0ba4-8855-734c0e68fb50/mzvf_192431168270380080.720w.h264lc.U.p.m4v'}
            src={this.state.songToPlay}
            autoPlay
            controls
          />}

      </div>
    );
  }
}

const styles = {
  audioPlayer: {
    position: 'fixed',
    bottom: '0px',
    width: '100%',
    height: '35px'
  }
}

export default MainPage;

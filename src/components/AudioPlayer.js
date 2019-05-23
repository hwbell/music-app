import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import ReactAudioPlayer from 'react-audio-player';
import posed from 'react-pose';

const Div = posed.div({
  enter: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
})

// 
class AudioPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (

      <div className="footer" style={styles.container}>

        <ReactAudioPlayer
          style={styles.audioPlayer}
          src={this.props.url}
          autoPlay
          controls
        />

        <p style={styles.audioText}>{this.props.info}</p>

        <Button className=""
          color="link"
          onClick={this.props.handleClick}>
          <i className="fas fa-times-circle navlink"></i>
        </Button>

      </div>

    );
  }
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  audioHolder: {
    width: '50%',
  },
  audioPlayer: {
    margin: '10px',
  },
  audioText: {
    color: 'whitesmoke',
    margin: '10px',
  },

}

export default AudioPlayer;



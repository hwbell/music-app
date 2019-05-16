import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import VideoPlayer from '../VideoPlayer';

// tools
import { getUsablePicUrl } from '../../tools/functions';

// 
class Featured extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderCard = this.renderCard.bind(this);
  }

  componentDidMount() {

  }

  // for each of the two top cards, #1 video and #1 song
  renderCard(props) {

    // change the width depending on the media type
    let containerClass = props.type === 'song' ? 'col-md-4' : 'col-md-8';

    // picUrl is the link to the image, and previewUrl to the actual preview, for song or video
    let picUrl = getUsablePicUrl(props.artwork.url, 1000);
    let previewUrl = props.previews[0].url;

    return (
      <div style={{minWidth: '200px', marginTop: '20px'}} className={containerClass}>
        <p style={styles.cardTitle}>featured {props.type}</p>

        <VideoPlayer picUrl={picUrl} previewUrl={previewUrl} style={styles.videoPlayer} />

        <p style={styles.songText}>{props.name.toLowerCase()}</p>
        <p style={styles.artistText}>{props.artistName}</p>
      </div>
    )
  }

  render() {

    let randomInt = Math.floor(Math.random() * Math.floor(10));

    return (

      <div className="row" style={styles.container}>

        {this.renderCard(this.props.topVideosData[randomInt])}
        {this.renderCard(this.props.topSongsData[randomInt])}

      </div>

    );
  }
}

const styles = {
  container: {
    // minWidth: '400px',
    // maxWidth: '800px',
    margin: '40px auto'
  },

  videoPlayer: {
    width: '100%',
    // margin: 'auto auto'
  },
  cardTitle: {
    textAlign: 'left',
    padding: '0px',
    margin: '0px',
    color: 'rgb(160, 15, 87)',
    fontSize: 'calc(25px + 1vw)',
  },
  songText: {
    color: 'rgb(160, 15, 87)',
    padding: '0px',
    fontSize: 'calc(20px + 0.5vw)',
  },
  artistText: {
    // marginLeft: '12px',
    padding: '0px',
    fontSize: 'calc(14px + 0.5vw)',
  },

}

export default Featured;



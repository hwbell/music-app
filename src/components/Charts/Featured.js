import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import VideoPlayer from '../VideoPlayer';

// tools
import { getUsablePicUrl } from '../../tools/functions';
import { shortenStr } from '../../tools/functions';

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


    // picUrl is the link to the image, and previewUrl to the actual preview, for song or video
    let picUrl = getUsablePicUrl(props.artwork.url, 1000);
    let previewUrl = props.previews[0].url;

    return (
      <div style={styles.cardHolder} className="col-md-6">
        <p style={styles.cardTitle}>featured {props.type}</p>

        <VideoPlayer picUrl={picUrl} previewUrl={previewUrl} style={{width: '100%'}} />

        <div>
          <p style={styles.songText}>{shortenStr(props.name.toLowerCase(), 60)}</p>
          <p style={styles.artistText}>{shortenStr(props.artistName.toLowerCase(), 60)}</p>
        </div>
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
    width: '100%',
    maxWidth: '800px',
    margin: '40px auto',
  },

  cardHolder: {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  cardTitle: {
    textAlign: 'left',
    padding: '0px',
    margin: '0px',
    color: 'rgb(221, 21, 98)',
    fontSize: 'calc(18px + 0.5vw)',
  },
  songText: {
    color: 'rgb(221, 21, 98)',
    padding: '0px',
    fontSize: 'calc(12px + 0.5vw)',
  },
  artistText: {
    // marginLeft: '12px',
    padding: '0px',
    fontSize: 'calc(14px + 0.5vw)',
  },

}

export default Featured;



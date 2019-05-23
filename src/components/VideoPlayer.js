import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "video-react/dist/video-react.css"; // import css for the video player

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
// this package is pretty great
import { Player, BigPlayButton, ControlBar, PlayToggle } from 'video-react';


// 
class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {

    return (

      <div className="album-card" style={this.props.style}>

        <Player
          fluid={false}
          width= {300}
          height={200}
          playsInline
          poster={this.props.picUrl}
          src={this.props.previewUrl}>
          <BigPlayButton position="center"/>

          {/* <ControlBar autoHide={false} disableDefaultControls={true}>
            <PlayToggle />
          </ControlBar> */}

        </Player>
      </div>

    );
  }
}

const styles = {
}

export default VideoPlayer;



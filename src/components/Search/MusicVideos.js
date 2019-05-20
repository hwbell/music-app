import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Media from "react-media";

//  components
import { Card, ListGroup, ListGroupItem, Collapse, Button, CardBody } from 'reactstrap';
import VideoPlayer from '../VideoPlayer';

// tools
import { getUsablePicUrl, convertMillisToStandard, shortenStr } from '../../tools/functions';

// 
class VideosList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      expanded: false
    }
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.renderVideos = this.renderVideos.bind(this);
    this.renderText = this.renderText.bind(this);
  }

  componentDidMount() {

  }

  // for the whole collapsible
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  // to increase / decrease the number shown 
  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  // use this function to query the screen width and shorten the text if needed
  renderText(text, style) {

    return (
      <Media query="(max-width: 799px)">
        {matches =>
          matches ? (
            <p style={style}>{shortenStr(text, 40)}</p>
          ) : (
              <p style={style}>{text}</p>
            )
        }
      </Media>
    )
  }

  renderVideos(videosData, length) {
    return (
      <div className="row">
        {videosData.map((video, i) => {

          if (i < length) {
            let { artwork, name, artistName } = video.attributes;

            // picUrl is the link to the image, and previewUrl to the actual preview, for song or video
            let picUrl = getUsablePicUrl(video.attributes.artwork.url, 1000);
            let previewUrl = video.attributes.previews[0].url;

            if (previewUrl) {
              return (
                <div key={i} className="col-sm-6 col-md-4" style={styles.videoContainer}>

                  <div>
                    <VideoPlayer picUrl={picUrl} previewUrl={previewUrl} style={{ width: '100%' }} />
                  </div>

                  <div>
                    {this.renderText(name, styles.songText)}
                    {this.renderText(artistName, styles.artistText)}
                  </div>

                </div>
              )
            } else {
              return null;
            }
          }

        })}
      </div>
    )
  }

  render() {

    const videosData = this.props.videosData;

    return (

      <div style={styles.container}>

        <div style={styles.titleHolder}>
          <p className="title" style={styles.titleText}>{this.props.title}</p>

          {/* this will open / close the remaining songs */}
          {this.props.videosData.length > 3 &&
            <Button color="link" style={styles.button} onClick={this.toggleExpanded}>
              {this.state.expanded ? 'show less' : 'all videos'}
            </Button>}

        </div>

        {/* show the first 3 songs initally */}
        {this.renderVideos(videosData, 3)}

        {/* put the rest in a collapse */}
        <Collapse style={{ width: '100%' }} isOpen={this.state.expanded}>
          {this.renderVideos(videosData.slice(3), videosData.length)}
        </Collapse>



      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
  },
  titleHolder: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'rgb(84, 26, 219)',
    margin: '20px',
    fontSize: 'calc(28px + 0.5vw)',
  },
  button: {
    // margin: '10px',
    marginRight: 'calc(20px + 1vw)',
    fontSize: 'calc(12px + 1vw)',
  },
  videoContainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  songText: {
    textAlign: 'left',
    fontSize: 'calc(12px + 0.5vw)',
  },
  artistText: {
    margin: '0px',
    padding: '0px',
    textAlign: 'left',
    fontSize: 'calc(10px + 0.5vw)',
  },

}

export default VideosList;



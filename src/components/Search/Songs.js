import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Media from "react-media";

//  components
import { Card, ListGroup, ListGroupItem, Collapse, Button, CardBody } from 'reactstrap';

// tools
import { getUsablePicUrl, convertMillisToStandard, shortenStr } from '../../tools/functions';

// 
class SongsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      expanded: false
    }
    this.toggle = this.toggle.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
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

    let dots = text.length > 40 ? ` ...` : ``;

    return (
      <Media query="(max-width: 599px)">
        {matches =>
          matches ? (
            <p style={style}>{`${text.slice(0, 40)}${dots}`}</p>
          ) : (
              <p style={style}>{text}</p>
            )
        }
      </Media>
    )
  }

  renderSongs(songsData, length) {
    return (
      <ListGroup style={styles.listGroup}>
        {songsData.map((song, i) => {

          if (i < length) {
            let { trackNumber, artwork, name, artistName } = song.attributes;

            let duration = convertMillisToStandard(song.attributes.durationInMillis);
            let imageSrc = artwork ? getUsablePicUrl(artwork.url, 300) : require('../../itunes.png');
            let previewUrl = song.attributes.previews[0].url;

            return (
              <ListGroupItem key={i} style={styles.listGroupItem}>
                <div className="row">

                  <div className="col-9">
                    <Button color="link"
                      style={styles.artistText}
                      
                      // the click function will change the song playing on the main
                      // page 
                      onClick={() => this.props.handleClick(previewUrl)}>
                      {this.renderText(name, styles.songText)}
                    </Button>
                    
                    {this.renderText(artistName, styles.listText)}
                  </div>
                  <div className="col-3" style={styles.imageHolder}>
                    {/* <p className="" style={styles.listText}>{`${duration}`}</p> */}
                    <img style={styles.image} src={imageSrc}></img>
                  </div>

                </div>
              </ListGroupItem>
            )
          }

        })}
      </ListGroup>
    )
  }

  render() {

    const songsData = this.props.songsData;

    return (

      <div style={styles.container}>

        <div style={styles.titleHolder}>
          <p className="title" style={styles.titleText}>{this.props.title}</p>

          {/* this will open / close the remaining songs */}
          {this.props.songsData.length > 3 &&
            <Button color="link" style={styles.button} onClick={this.toggleExpanded}>
              {this.state.expanded ? 'show less' : 'all songs'}
            </Button>}

        </div>

        {/* show the first 3 songs initally */}
        {this.renderSongs(songsData, 3)}

        {/* put the rest in a collapse */}
        <Collapse style={{ width: '100%' }} isOpen={this.state.expanded}>
          {this.renderSongs(songsData.slice(3), songsData.length)}
        </Collapse>

        

      </div>

    );
  }
}

const styles = {
  container: {
    width: '95%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%'
  },
  listGroup: {
    width: '100%',
  },
  listGroupItem: {
    
    // maxHeight: 'calc(75px + 2vw)',
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
  listText: {
    marginLeft: '12px',
    padding: '0px',
    fontSize: 'calc(10px + 0.5vw)',
  },
  songText: {
    textAlign: 'left',
    padding: '0px',
    margin: '0px',
    fontSize: 'calc(14px + 0.5vw)',

  },
  imageHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    height: 'calc(65px + 2vw)',
    width: 'calc(65px + 2vw'
  },
  
}

export default SongsList;



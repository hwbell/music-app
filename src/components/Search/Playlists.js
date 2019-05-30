import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Media from "react-media";

//  components
import { Card, ListGroup, ListGroupItem, Collapse, Button, CardBody } from 'reactstrap';

// tools
import { getUsablePicUrl, convertMillisToStandard, shortenStr } from '../../tools/functions';

// 
class playlistsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      expanded: false
    }
    this.toggle = this.toggle.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.renderPlaylists = this.renderPlaylists.bind(this);
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
      <Media query="(max-width: 599px)">
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

  renderPlaylists(playlistsData, length) {
    return (
      <ListGroup style={styles.listGroup}>
        {playlistsData.map((playlist, i) => {

          if (i < length) {
            let { url, artwork, name, artistName, description } = playlist.attributes;

            {/* let duration = convertMillisToStandard(playlist.attributes.durationInMillis); */ }
            {/* let imageSrc = artwork ? getUsablePicUrl(artwork.url, 300) : require('../../itunes.png');

            // this is to pass back to the main page for the audio player 
            let playlistInfo = shortenStr(name, 20);
            let editorialNotes = description.standard; */}

            // embed with the apple toolkit!
            let playlistIdUrl = url.slice(url.indexOf('playlist'));
            let embedUrl = `https://embed.music.apple.com/us/${playlistIdUrl}?app=music&at=JL2MDAX9R6`

            return (
              <div>
                <iframe allow="autoplay *; encrypted-media *;"
                  frameborder="0"
                  height="300"
                  style={styles.embed}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={embedUrl}>
                </iframe>
              </div>
            )
          }

        })}
      </ListGroup>
    )
  }

  render() {

    const playlistsData = this.props.playlistsData;

    return (

      <div style={styles.container}>

        <div style={styles.titleHolder}>
          <p className="title" style={styles.titleText}>{this.props.title}</p>

          {/* this will open / close the remaining playlists */}
          {playlistsData.length > 3 &&
            <Button color="link" style={styles.button} onClick={this.toggleExpanded}>
              {this.state.expanded ? 'show less' : 'all playlists'}
            </Button>}

        </div>

        {/* show the first 3 playlists initally */}
        {this.renderPlaylists(playlistsData, 3)}

        {/* put the rest in a collapse */}
        <Collapse style={{ width: '100%' }} isOpen={this.state.expanded}>
          {this.renderPlaylists(playlistsData.slice(3), playlistsData.length)}
        </Collapse>

        <hr></hr>

      </div>

    );
  }
}

const styles = {
  container: {
    width: '95%',
    maxWidth: '720px',
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
    // margin: '20px',
    fontSize: 'calc(28px + 0.5vw)',
  },
  button: {
    // margin: '10px',
    // marginRight: 'calc(20px + 1vw)',
    fontSize: 'calc(12px + 1vw)',
  },
  listText: {
    marginLeft: '10px',
    padding: '0px',
    fontSize: 'calc(10px + 0.5vw)',
  },
  playlistText: {
    textAlign: 'left',
    padding: '0px',
    margin: '0px',
    fontSize: 'calc(12px + 0.5vw)',

  },
  imageHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    height: 'calc(50px + 2vw)',
    width: 'calc(50px + 2vw'
  },

}

export default playlistsList;



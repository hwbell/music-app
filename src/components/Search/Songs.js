import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, ListGroup, ListGroupItem, Collapse, Button, CardBody } from 'reactstrap';

// tools
import { getUsablePicUrl, convertMillisToStandard } from '../../tools/functions';

// 
class SongsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      expanded: false
    }
    this.toggle = this.toggle.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
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

  renderSongs(songsData, length) {
    return (
      <ListGroup style={styles.listGroup}>
        {songsData.map((song, i) => {

          if (i < length) {
            let { trackNumber, artwork, name, artistName } = song.attributes;

            let tooLong = name.length > 20;
            if (tooLong) {
              name = `${song.attributes.name.toString().slice(0, 20)} ...`;
            }

            let duration = convertMillisToStandard(song.attributes.durationInMillis);
            let imageSrc = artwork ? getUsablePicUrl(artwork.url, 300) : require('../../itunes.png');

            return (
              <ListGroupItem key={i} style={styles.listGroupItem}>
                <div className="row">

                  <div className="col-6">
                    <p className="" style={styles.songText}>{`${name}`}</p>
                    <p className="" style={styles.listText}>{`${artistName}`}</p>
                  </div>

                  <p className="col-2 col-sm-3" style={styles.listText}>{`${duration}`}</p>
                  <div className="col-2 col-sm-3" style={styles.imageHolder}>
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

        <p className="title" style={styles.titleText}>{this.props.title}</p>
          
        {this.renderSongs(songsData, 3)}

        <Collapse style={{ width: '100%', marginLeft: '10%' }} isOpen={this.state.expanded}>
          {this.renderSongs(songsData.slice(3), songsData.length)}
        </Collapse>

        {songsData.length > 3 &&
            <Button className='button-purple song-image col' style={styles.button} onClick={this.toggleExpanded}>
              {this.state.expanded ? 'show less' : 'show all songs'}
            </Button>}

      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  card: {
    width: '100%'
  },
  listGroup: {
    width: '90%',
  },
  listGroupItem: {
    // width: '90%',
    // height: '50px',
  },
  titleText: {
    fontSize: 'calc(28px + 0.5vw)',
  },
  listText: {
    // paddingTop: '8px',
    fontSize: 'calc(10px + 0.5vw)',
  },
  songText: {
    fontSize: 'calc(12px + 0.5vw)',
    fontWeight: 'bold',
    // color: '#E91E63'

  },
  button: {
    alignSelf: 'flex-start',
    margin: '5vw',
    width: '200px'
  },
  imageHolder: {
    height: '80px',
    paddingRight: '20px'
  },
  image: {
    height: '100%'
  },

}

export default SongsList;



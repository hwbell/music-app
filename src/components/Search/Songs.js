import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

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

            if (name.length > 16) {
              name = `${name.slice(0, 16)} ...`;
            }
            if (artistName.length > 16) {
              artistName = `${artistName.slice(0, 16)} ...`;
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


                  <div className="col-6" style={styles.imageHolder}>
                    <p className="" style={styles.listText}>{`${duration}`}</p>
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

        <Collapse style={{ width: '100%' }} isOpen={this.state.expanded}>
          {this.renderSongs(songsData.slice(3), songsData.length)}
        </Collapse>

        {this.props.songsData.length > 3 &&
          <Button className='button-purple' style={styles.button} onClick={this.toggleExpanded}>
            {this.state.expanded ? 'show less' : 'show all songs'}
          </Button>}

      </div>

    );
  }
}

const styles = {
  container: {
    width: '95%',
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
    width: '100%',
  },
  listGroupItem: {
    maxHeight: 'calc(70px + 2vw)',
  },
  titleText: {
    fontSize: 'calc(28px + 0.5vw)',
  },
  listText: {
    margin: '0px',
    padding: '0px',
    fontSize: 'calc(10px + 0.5vw)',
  },
  songText: {
    padding: '0px',
    margin: '0px',
    fontSize: 'calc(12px + 0.5vw)',
    fontWeight: 'bold',
    // color: '#E91E63'

  },
  imageHolder: {
    // border: '1px solid',
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingRight: '20px'
  },
  image: {
    height: 'calc(45px + 1vw)',
    width: 'calc(45px + 1vw'
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: '2vw',
    width: '180px'
  },
}

export default SongsList;



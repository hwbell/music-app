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
      expanded: false,
    }
    this.renderSongs = this.renderSongs.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  componentDidMount() {

  }

  // to increase / decrease the number shown 
  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderSongs(songsData, length) {
    // console.log(songsData)

    return (
      <ListGroup style={styles.listGroup}>
        {songsData.map((song, i) => {

          if (i < length) {
            let { trackNumber, name, artistName } = song.attributes;
            let displayName = shortenStr(name, 20)
            let duration = convertMillisToStandard(song.attributes.durationInMillis);
            let previewUrl = song.attributes.previews[0].url;
            
            return (
              <ListGroupItem className="song-list-item" key={i}
                
                // this changes the song playing on the main page
                onClick={() => this.props.handleClick(previewUrl, displayName)}>
                
                <div style={styles.listGroupItem}>
                  <p style={styles.listText}>{`${trackNumber}`}</p>
                  <p style={styles.listText}>{`${displayName}`}</p>
                  <p style={styles.listText}>{`${duration}`}</p>
                </div>

              </ListGroupItem>
            )
          }

        })}
      </ListGroup>
    )
  }

  render() {

    let collapseStyle = { width: this.props.width || '100%' };


    return (

      <div style={styles.container}>

        <Collapse style={collapseStyle} isOpen={this.props.collapse}>
          <div style={styles.card}>
            {this.renderSongs(this.props.songList, this.props.songList.length)}
          </div>
        </Collapse>

        {this.props.songList.length > 0 &&
          <Button className="button-purple"
            style={collapseStyle}
            onClick={this.props.toggle}>
            {this.props.title}</Button>}

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
    width: '100%',
  },
  listGroupItem: {
    
    width: '100%',
    height: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listText: {
    padding: '0px',
    paddingTop: '5px',
    fontSize: 'calc(8px + 0.5vw)',
  },

}

export default SongsList;



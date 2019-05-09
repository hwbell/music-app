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
      expanded: false
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
    return (
      <ListGroup style={styles.listGroup}>
        {songsData.map((song, i) => {

          if (i < length) {
            let { trackNumber } = song.attributes;
            let tooLong = song.attributes.name.length > 14;
            let name = tooLong ? `${song.attributes.name.toString().slice(0, 14)} ...` : song.attributes.name;
            let duration = convertMillisToStandard(song.attributes.durationInMillis);
            let imageSrc = getUsablePicUrl(song.attributes.artwork.url, 40);

            return (
              <ListGroupItem key={i} style={styles.listGroupItem}>
                <p style={styles.listText}>{`${trackNumber}`}</p>
                <p style={styles.listText}>{`${name}`}</p>
                <p style={styles.listText}>{`${duration}`}</p>
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

        {this.props.songList.length > 0 &&
          <Button className="button-purple"
            style={collapseStyle}
            onClick={this.props.toggle}>
            {this.props.title}</Button>}

        <Collapse style={collapseStyle} isOpen={this.props.collapse}>
          <div style={styles.card}>
            {this.renderSongs(this.props.songList, this.props.songList.length)}
          </div>

          {/* <Button className='button-purple'
            style={styles.button}
            onClick={this.toggleExpanded}>
            {this.state.expanded ? 'less' : 'more'}
          </Button> */}
        </Collapse>
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
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listText: {
    padding: '0px',
    paddingTop: '5px',
    fontSize: 'calc(10px + 0.5vw)',
  }

}

export default SongsList;



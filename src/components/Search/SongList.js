import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, ListGroup, ListGroupItem, Collapse, Button, CardBody } from 'reactstrap';

// tools
import { convertMillisToStandard } from '../../tools/functions';

// 
class Genres extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    }
    this.toggle = this.toggle.bind(this);
    this.renderSongs = this.renderSongs.bind(this);
  }

  componentDidMount() {

  }
  // this will be called at the end of the fetch call, so it won't expand until we have the songs
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  renderSongs() {
    return (
      <ListGroup style={styles.listGroup}>
        {this.props.songList.map((song, i) => {

          let { trackNumber } = song.attributes;
          let tooLong = song.attributes.name.length > 14;
          let name = tooLong ? `${song.attributes.name.toString().slice(0, 14)} ...` : song.attributes.name;
          let duration = convertMillisToStandard(song.attributes.durationInMillis);

          return (
            <ListGroupItem key={i} style={styles.listGroupItem}>
              <p style={styles.listText}>{`${trackNumber}`}</p>
              <p style={styles.listText}>{`${name}`}</p>
              <p style={styles.listText}>{`${duration}`}</p>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    )
  }

  render() {
    return (

      <div style={styles.container}>
        <Button className="button-purple" style={styles.button} onClick={this.toggle}>show tracks</Button>
        <Collapse style={{width: '100%'}} isOpen={!this.state.collapse}>
          <div style={styles.card}>
            {this.renderSongs()}
          </div>
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
  button: {
    width: '100%'
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
    paddingTop: '8px',
    fontSize: '14px',
  }

}

export default Genres;



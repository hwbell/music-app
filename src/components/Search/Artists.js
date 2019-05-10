import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardBody, CardTitle, CardText, CardImg, ListGroup, ListGroupItem, Collapse, Button } from 'reactstrap';

// tools
import { getUsablePicUrl } from '../../tools/functions';
import { type } from 'os';

// 
class Artists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      expanded: false
    }
    this.toggle = this.toggle.bind(this);
    this.renderArtists = this.renderArtists.bind(this);
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

  renderArtists(artistsData, length) {
    return (
      <ListGroup style={styles.listGroup}>
        {artistsData.map((artist, i) => {

          {/* console.log(`i: ${i}`)
          console.log(artist) */}

          // get the first artwork available in the artists list of albums
          // if there isnt one at all, use the itunes icon
          let albumList = artist.relationships.albums.data;
          let artwork;
          for (let j = 0; j < albumList.length; j++) {
            {/* console.log(`j: ${j}`) */ }
            let album = albumList[j];
            if (album.attributes && album.attributes.artwork) {
              artwork = album.attributes.artwork;
              break;
            }
          }

          if (i < length) {
            // if we got an imageSrc above, use it. otherwise use the itunes icon
            let imageSrc = artwork ? getUsablePicUrl(artwork.url, 300) : require('../../itunes.png');
            let { name, genreNames, id } = artist.attributes;
            
            return (
              <ListGroupItem key={i}>

                <div className="row">
                  <div className="col-6">
                    <img style={styles.image} src={imageSrc}></img>
                  </div>
                  <div className="col-6" style={styles.nameHolder}>

                    <Button color="link"
                      style={styles.artistText}
                      onClick={() => this.props.handleClick(name)}>
                      {`${name}`}
                    </Button>

                    <p style={styles.listText}>{`${genreNames}`}</p>

                  </div>
                </div>
              </ListGroupItem>
            )

          } else {
            return null;
          }

        })}
      </ListGroup>
    )
  }

  render() {

    return (

      <div style={styles.container}>

        <p className="title" style={styles.titleText}>{this.props.title}</p>

        {this.renderArtists(this.props.artistsData, 3)}

        <Collapse style={{ width: '100%' }} isOpen={this.state.expanded}>
          {this.renderArtists(this.props.artistsData.slice(3), this.props.artistsData.length)}
        </Collapse>

        {this.props.artistsData.length > 3 &&
          <Button className='button-purple' style={styles.button} onClick={this.toggleExpanded}>
            {this.state.expanded ? 'show less' : 'all artists'}
          </Button>}

        {/* {this.props.artistsData.length > 0 &&
          <Button className="button-purple"
            style={{ width: '100%' }}
            onClick={this.toggle}>
            {this.props.title}</Button>}

        <Collapse style={{ width: '100%' }} isOpen={!this.state.collapse}>
          <div style={styles.card}>
            {this.renderArtists(this.props.artistsData, this.props.artistsData.length)}
          </div>

        </Collapse> */}
      </div>

    );
  }
}

const styles = {
  container: {
    marginTop: '40px',
    width: '95%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  titleText: {
    fontSize: 'calc(28px + 0.5vw)',
  },
  listHolder: {
    width: '100%'
  },
  listGroup: {
    width: '100%',
    backgroundColor: 'grey'
  },
  listGroupItem: {
    width: '100%',
  },
  nameHolder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image: {
    width: '80px',
    height: '80px'
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: '2vw',
    width: '180px'
  },
  artistText: {
    padding: '0px',
    fontSize: 'calc(14px + 0.5vw)',
  },
  listText: {
    padding: '0px',
    fontSize: 'calc(10px + 0.5vw)',
  }

}

export default Artists;



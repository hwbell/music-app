import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg } from 'reactstrap';
import SongList from '../Search/SongList';

// tools
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// 
class AlbumDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSongList: false
    }
    this.toggleSongList = this.toggleSongList.bind(this);

  }

  componentDidMount() {
    // 
  }

  toggleSongList() {
    this.setState({
      showSongList: !this.state.showSongList
    })
  }

  render() {

    // console.log(this.props.album.attributes)

    let { artistName, name, artwork, recordLabel, releaseDate, editorialNotes } = this.props.album.attributes;

    // slice off the ending '{w}x{h}bb.jpeg' part of the url. we can replace it
    // with '200x200bb.jpeg' for example. width + height can be assigned this way
    let slicePoint = artwork.url.indexOf('{w}');

    let picUrl = artwork.url.slice(0, slicePoint) + '1000x1000bb.jpeg';

    return (

      <Card className="album-detail-card" style={styles.container}>
        <img style={styles.cardImg} src={picUrl} alt="Card image cap" />

        <div style={styles.textContainer}>
          <CardTitle style={styles.cardTitle}>{name}</CardTitle>

          <div className="row">
            <CardText style={styles.cardText}>{`${artistName} -${releaseDate.slice(0, 4)}`}</CardText>
          </div>

          {/* sometimes these arent present */}
          {editorialNotes &&
            <CardText style={styles.cardDesc}>
              {ReactHtmlParser(editorialNotes.standard)}
            </CardText>}

          {/* the song list with toggler. just pass it the songList when its ready */}
          {this.props.songList &&
            <SongList isSmall={true}
              collapse={this.state.showSongList}
              toggle={this.toggleSongList}
              songList={this.props.songList}
              title="show tracks" />}
        </div>


      </Card>

    );
  }
}

const styles = {
  container: {
    border: 'none',
    width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  cardImg: {
    width: '100%',
  },
  textContainer: {
    width: '85%',
    margin: '5px auto',
    // display: 'flex',
    // // flexGrow: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  cardTitle: {
    marginTop: '15px',
    textAlign: 'center',
    color: 'whitesmoke',
    fontWeight: 'bolder',
    fontSize: 'calc(14px + 0.5vw)',
  },
  cardText: {
    textAlign: 'center',
    margin: '15px',
    color: 'whitesmoke',
    fontSize: 'calc(14px + 0.5vw)',
    padding: '3px',
  },
  cardDesc: {
    textAlign: 'left',
    color: 'whitesmoke',
    fontSize: 'calc(10px + 0.5vw)',
    marginBottom: '15px'
  },


}

export default AlbumDetail;



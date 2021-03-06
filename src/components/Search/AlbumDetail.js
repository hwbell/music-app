import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg } from 'reactstrap';
import SongList from '../Search/SongList';

// tools
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { getUsablePicUrl } from '../../tools/functions';
// 
class AlbumDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        showSongList: false,
        songPlaying: true
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

      let picUrl = getUsablePicUrl(artwork.url, 500, 'cc');
      let date = releaseDate ? `${artistName} - ${releaseDate.slice(0, 4)}` : artistName;

      return (

        <Card className="album-detail-card" style={styles.container}>
          <img style={styles.cardImg} src={picUrl} alt="Card image cap" />

          <div style={styles.textContainer}>
            <CardTitle style={styles.cardTitle}>{name}</CardTitle>
            <CardText style={styles.cardText}>{date}</CardText>

            {/* the song list with toggler. just pass it the songList when its ready */}
            {this.props.songList &&
              <SongList isSmall={true}
                handleClick={this.props.handleClick}
                collapse={this.state.showSongList}
                toggle={this.toggleSongList}
                songList={this.props.songList}/>}

            
            {/* sometimes these arent present */}
            {editorialNotes &&
              <CardText style={styles.cardDesc}>
                {ReactHtmlParser(editorialNotes.standard)}
              </CardText>}
          </div>

        </Card>

      );
    }
  }

const styles = {
  container: {
    border: 'none',
    width: '100%',
    marginBottom: '20px'
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
  audioPlayer: {
    zIndex: 3,
    position: 'fixed',
    width: '90%',
    margin: 'auto auto',
    bottom: '0px'
  }


}

export default AlbumDetail;



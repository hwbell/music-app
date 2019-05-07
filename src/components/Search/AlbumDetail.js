import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg } from 'reactstrap';
import SongList from '../Search/SongList';

// tools
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { getWebToken } from '../../tools/getWebToken';

// 
class AlbumDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    }
    this.fetchSongList = this.fetchSongList.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {

  }

  // this will be called at the end of the fetch call, so it won't expand until we have the songs
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  // this will be a search of the album selected, since we don't get the actual tracks from 
  // the album attributes. Make search fetch for songs only using the album name as the query,
  // and grab only the songs that have that album name 
  fetchSongList(query) {
    const self = this;

    // this is the form specified by apple
    let jwtToken = getWebToken();
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }

    // for a search query
    const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs`;

    fetch(searchUrl, {
      method: 'GET',
      headers
    })
      .then(res => res.json())
      .then((json) => {

        console.log(`${json.results.songs.data.length} total songs returned`)
        const songs = json.results.songs.data;

        // first get only the songs that match the query on their album name
        let albumSongs = [];
        songs.map((song) => {
          if (song.attributes.albumName.toLowerCase() === query) {
            console.log(song.attributes.name);
            albumSongs.push(song);
          }
        })

        console.log(albumSongs.length)

        // then sort the songs by the trackIndex property
        let sortedSongs = [];
        for (let i = 1; i < albumSongs.length + 1; i++) {
          // console.log(`checking ${i}`)
          albumSongs.forEach((song) => {
            if (i === song.attributes.trackNumber) {
              sortedSongs.push([song.attributes.name, song.attributes.trackNumber])
            }
          });
        }
        console.log(sortedSongs)

        self.setState({
          songList: sortedSongs,
          collapse: false
        })
      })
      .catch((e) => console.log(e))
  }

  render() {

    let album = this.props.album;
    let { artistName, name, artwork, recordLabel, releaseDate, editorialNotes } = album.attributes;

    console.log(album)
    // slice off the ending '{w}x{h}bb.jpeg' part of the url. we can replace it
    // with '200x200bb.jpeg' for example. width + height can be assigned this way
    let slicePoint = artwork.url.indexOf('{w}');

    let picUrl = artwork.url.slice(0, slicePoint) + '1000x1000bb.jpeg';

    return (

      <Card className="album-detail-card" style={styles.container}>
        <CardImg style={styles.cardImg} src={picUrl} alt="Card image cap" />

        <div style={styles.textContainer}>
          <CardTitle style={styles.cardTitle}>{name}</CardTitle>

          <div className="row">
            <CardText style={styles.cardText}>{artistName}</CardText>
            <CardText style={styles.cardText}>{`${releaseDate.slice(0, 4)}`}</CardText>
          </div>

          {/* the song list with toggler */}
          <SongList />

          {/* sometimes these arent present */}
          {editorialNotes && <CardText style={styles.cardDesc}>{ReactHtmlParser(editorialNotes.standard)}</CardText>}

        </div>


      </Card>

    );
  }
}

const styles = {
  container: {
    border: 'none',
    width: '100%'
  },
  cardImg: {
    width: '99%',
    margin: '1px auto'
    // height: '260px',
  },
  textContainer: {
    width: '85%',
    margin: 'auto auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: 'whitesmoke',
    fontSize: 'calc(12px + 0.5vw)',
    padding: '3px'
  },
  cardDesc: {
    textAlign: 'left',
    color: 'whitesmoke',
    fontSize: 'calc(10px + 0.5vw)'
  },


}

export default AlbumDetail;



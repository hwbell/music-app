import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import AlbumCard from './AlbumCard';
import AlbumDetail from './AlbumDetail';
import { Button, Collapse } from 'reactstrap';

// tools
import { getUsablePicUrl } from '../../tools/functions';
import { getWebToken } from '../../tools/getWebToken';

// 
class Albums extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      expanded: false
    }
    this.renderCards = this.renderCards.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.prefetchImages = this.prefetchImages.bind(this);
    this.fetchSongList = this.fetchSongList.bind(this);
  }

  componentDidMount() {
    // prefetch the images
    this.prefetchImages();

    // get the song list for the active album
    this.handleClick(0);

  }

  // do this to pre-fetch the images, so they dont delay
  prefetchImages() {
    this.props.albumsData.forEach((album) => {
      const img = new Image();
      img.src = getUsablePicUrl(album.attributes.artwork.url, 500);
      // console.log(img.src)
    });
  }

  // this will be a new search of the album selected, since we don't get the actual tracks from 
  // the album attributes. Make search fetch for songs only, using the album name as the query,
  // and grab only the songs that have that album name 
  fetchSongList(query) {

    const self = this;

    console.log(`getting songs for the album: `);
    console.log(query.toLowerCase())

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

        let matches = 0;
        let albumSongs = [];
        songs.map((song) => {
          let album = song.attributes.albumName;

          // not sure if the toLowerCase() is needed but seems safer
          if (album.toLowerCase() === query.toLowerCase()) {
            matches++;
            albumSongs.push(song);
          }
        })
        console.log(`${matches} matching songs`)

        // sort the songs by looking for i in the trackNumber property
        let sortedSongs = [];

        for (let i = 1; i < albumSongs.length + 1; i++) {
          // console.log(`checking ${i}`)
          albumSongs.forEach((song) => {
            if (i === song.attributes.trackNumber) {
              sortedSongs.push(song);
            }
          });
        }
        console.log(sortedSongs)

        self.setState({
          songList: sortedSongs
        })

      })
      .catch((e) => console.log(e))
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleClick(index) {
    this.setState({
      activeIndex: index
    }, () => {
      let album = this.props.albumsData[this.state.activeIndex]
      this.fetchSongList(album.attributes.name);
    })
  }

  // renders the cards for the albums. control how many are rendered with the length argument
  renderCards(albumsData, length) {

    return (

      albumsData.map((album, i) => {

        if (i < length && !!album) {

          let artUrl = album.attributes.artwork.url;

          // get a usable url with real size
          let picUrl = getUsablePicUrl(artUrl, 500);

          let fullName = album.attributes.name;
          let tooLong = fullName.length > 40;

          let title = tooLong ? fullName.toLowerCase().slice(0, 40) + '...' : fullName.toLowerCase();

          return (

            <AlbumCard key={i}
              handleClick={this.handleClick}
              index={i}
              title={title}
              picUrl={picUrl} />
          )
        }

      })
    )
  }

  render() {

    // keep track of which one has been clicked, starting with just the first 
    // in the list.
    let activeIndex = this.state.activeIndex;

    return (

      <div className="container" style={styles.container}>

        <div className="row">

          {/* the featured album - whichever is currently selected. defaults to first in list */}
          <div className="col-sm-6">
            <AlbumDetail
              album={this.props.albumsData[activeIndex]}
              songList={this.state.songList}
              collapse={true}
            />
          </div>

          {/* the album cards to select from */}
          <div className="col-sm-6">

            <div className="row" style={styles.cardsHolder}>
              {this.renderCards(this.props.albumsData, 9)}
            </div>

            <Collapse style={{width: '100%'}} isOpen={this.state.expanded}>
              <div className="row" style={styles.cardsHolder}>
                {this.renderCards(this.props.albumsData.slice(10), 25)}
              </div>
            </Collapse>

            <Button className='button-purple' style={styles.button} onClick={this.toggleExpanded}>
              {this.state.expanded ? 'less' : 'more'}
            </Button>



          </div>

        </div>

      </div>

    );
  }
}

const styles = {
  container: {
    // border: '1px solid grey'
    // height: '400px'
  },
  cardsHolder: {
    maxWidth: '1200px',
    margin: 'auto auto'
    // minWidth: '300px'
  },

  button: {
    margin: '10px',
    marginLeft: '0px',
  }

}

export default Albums;



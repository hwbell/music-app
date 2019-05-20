import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import MediaOverlayCard from '../MediaOverlayCard';
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
    // console.log(this.props.albumsData[0])

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

    // console.log(`getting songs for the album: `);
    // console.log(query)

    // this is the form specified by apple
    let jwtToken = getWebToken();
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }

    // for an album query
    const searchUrl = `https://api.music.apple.com/v1/catalog/us/albums/${query}`;

    fetch(searchUrl, {
      method: 'GET',
      headers
    })
      .then(res => res.json())
      .then((json) => {

        // console.log(json.data[0].relationships.tracks.data)
        self.setState({
          songList: json.data[0].relationships.tracks.data
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
    // console.log(this.props.albumsData)
    this.setState({
      activeIndex: index
    }, () => {
      let album = this.props.albumsData[this.state.activeIndex]
      this.fetchSongList(album.id);
    })
  }

  // renders the cards for the albums. control how many are rendered with the length argument. 
  // the assigned index with increment up from startIndex. This is needed to render the full 
  // list after the first 3
  renderCards(albumsData, length, startIndex) {

    return (

      albumsData.map((album, i) => {

        if (i < length && !!album) {

          let artUrl = album.attributes.artwork.url;
          let id = album.attributes.id;
          // get a usable url with real size
          let picUrl = getUsablePicUrl(artUrl, 500);

          let fullName = album.attributes.name;
          let tooLong = fullName.length > 40;

          let title = tooLong ? fullName.toLowerCase().slice(0, 30) + '...' : fullName.toLowerCase();

          return (

            <MediaOverlayCard key={i}
              className="album-card col-6 col-md-4"
              handleClick={this.handleClick}
              index={startIndex+i}
              id={id}
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

      <div className="" style={styles.container}>

        <p className="title" style={styles.titleText}>{this.props.title}</p>

        <div className="row">

          {/* the featured album - whichever is currently selected. defaults to first in list */}
          <div className="col-sm-8 col-md-6">
            <AlbumDetail
              handleClick={this.props.handleClick}
              album={this.props.albumsData[activeIndex]}
              songList={this.state.songList}
              collapse={true}
            />
          </div>

          {/* the album cards to select from */}
          <div className="col-sm-4 col-md-6">

            <div className="row" style={styles.cardsHolder}>
              {this.renderCards(this.props.albumsData, 9, 0)}
            </div>

            <Collapse style={{ width: '100%' }} isOpen={this.state.expanded}>
              <div className="row" style={styles.cardsHolder}>
                {this.renderCards(this.props.albumsData.slice(10), 25, 10)}
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
    marginTop: '40px',
    width: '95%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    alignSelf: 'flex-start',
    color: 'rgb(84, 26, 219)',
    margin: '20px',
    fontSize: 'calc(28px + 0.5vw)',
  },
  cardsHolder: {
    width: '100%',
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



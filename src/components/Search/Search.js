import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

// components
import Title from '../Title';
import SearchInput from '../Search/SearchInput'
import Albums from '../Search/Albums';
import Songs from '../Search/Songs';
import MusicVideos from '../Search/MusicVideos';
import Artists from '../Search/Artists';
import { Spinner } from 'reactstrap';

// tools
import { getWebToken } from '../../tools/getWebToken';
import { getUsablePicUrl } from '../../tools/functions';

// set up some useful state objs
const initialState = {
  songs: null,
  artists: null,
  albums: null,
  stations: null,
  showLoading: true,
  query: 'rolling stones'
}

// while getting new results
const loadingState = {
  songs: null,
  artists: null,
  albums: null,
  stations: null,
  showLoading: true
}

const fetch = require("node-fetch");

// Search is the master component that contains all things related to the user's search input
// contains SearchInput, SearchResults
class Search extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewSelection = this.handleNewSelection.bind(this);
  }

  componentDidMount() {
    this.fetchSearch(this.state.query);
  }

  // for searches
  fetchSearch(query) {

    const self = this;

    // this is the form specified by apple
    let jwtToken = getWebToken();
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }

    // for a search query
    const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,albums,artists,music-videos`;

    fetch(searchUrl, {
      method: 'GET',
      headers
    })
      .then(res => res.json())
      // for searches
      // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

      // for charts
      .then((json) => {

        // get these object via destructuring, then get rid of the ones that don't exist
        let { songs, albums, artists } = json.results;
        let videos = json.results['music-videos'];

        // initialize an object to store the results that exist
        // initialize with showLoading: false so the loader can be eliminated when we get the data
        // this way we only call this.setState({}) once below
        let definedData = { showLoading: false };
        
        [songs, albums, artists, videos].forEach((obj) => {
          // check if it is defined
          if (obj) {
            let { data } = obj;
            let { type } = data[0];

            console.log(`*************************Top ${type}***********************`);
            console.log(`${data.length} ${type} returned`)
            console.log(`**********************************************************`);

            // throw it in the object with its type as the property name
            definedData[`${type}`] = data;
          }

        });

        self.setState(definedData);

        // albums.forEach((album) => {
        //   const img = new Image();
        //   img.src = getUsablePicUrl(album.attributes.artwork.url, 500);
        //   // console.log(img.src)
        // });

      })
      .catch((e) => console.log(e))

  }

  // handleSubmit and handleChange will be passed to the SearchInput component
  // handleSubmit fires the search for the current query
  handleSubmit(e) {
    console.log(`search fired => ${this.state.query}`)
    e.preventDefault();

    this.setState(loadingState, () => {
      this.fetchSearch(this.state.query);
    })

  }

  // handleChange changes the value of the current query
  handleChange(value) {
    this.setState({
      query: value
    });
  }

  // this is a separate handler for when the user clicks a new artist to search
  // easier to separate from handleSubmit 
  handleNewSelection(query) {
    this.setState({
      query,
    }, () => {
      this.setState(loadingState, () => {
        this.fetchSearch(this.state.query);
      })
    });
  }

  render() {

    let askToSearch = !this.state.songs && !this.state.showLoading;

    return (

      <div className="col" id="search" style={styles.container}>

        {this.state.showLoading &&
          <Spinner style={styles.spinner} color="primary" />
        }

        {/* display the title */}
        <Title color="rgb(84, 26, 219)" text="find your music"/>

        {/* search bar */}
        <SearchInput
          query={this.state.query}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />

        {askToSearch &&
          <p style={{ fontSize: 'calc(16px+0.5vw)' }}>search for a song, artist, or album</p>
        }

        {/* songs section */}
        {this.state.songs &&
          <Songs 
            title="songs" 
            handleClick={this.props.handleSongChange} 
            songsData={this.state.songs} />}

        {/* videos section */}
        {this.state['music-videos'] && 
          <MusicVideos title="music videos" 
            videosData={this.state['music-videos']}/>}
        
        {/* artists section */}
        {this.state.artists &&
          <Artists title="artists" 
            handleClick={this.handleNewSelection} 
            artistsData={this.state.artists} />}

        {/* albums section */}
        {this.state.albums &&
          <Albums title="albums" 
            albumsData={this.state.albums} 
            handleClick={this.props.handleSongChange}   
            />}
      </div>

    );
  }
}

const styles = {
  container: {
    // border: '1px solid black',
    minHeight: '100vh',
    margin: '20px auto',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  spinner: {
    position: 'absolute',
    top: '40vh',
    left: '48vw'
  }

}

export default Search;



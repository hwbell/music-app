import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

// components
import SearchInput from '../Search/SearchInput'
import Albums from '../Search/Albums';
import Songs from '../Search/Songs';
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
  query: ''
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
    // this.fetchSearch();
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
    const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,albums,artists`;

    fetch(searchUrl, {
      method: 'GET',
      headers
    })
      .then(res => res.json())
      // for searches
      // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

      // for charts
      .then((json) => {

        // console.log(json.results.albums.data)

        let songs = json.results.songs.data;
        let albums = json.results.albums.data;
        let artists = json.results.artists.data;

        console.log(songs.length + " songs returned");
        console.log(albums.length + " albums returned");
        console.log(artists.length + " artists returned");

        self.setState({
          songs,
          albums,
          artists,
          showLoading: false
        });

        albums.forEach((album) => {
          const img = new Image();
          img.src = getUsablePicUrl(album.attributes.artwork.url, 500);
          // console.log(img.src)
        });

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
    return (

      <div className="col" style={styles.container}>

        {this.state.showLoading &&
          <Spinner style={styles.spinner} color="primary" />
        }

        {/* search bar */}
        <SearchInput
          query={this.state.query}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />

        {/* songs section */}
        {this.state.songs &&
          <Songs width="70vw" title="songs" songsData={this.state.songs} />}

        {/* artists section */}
        {this.state.artists &&
          <Artists title="artists" handleClick={this.handleNewSelection} artistsData={this.state.artists} />}

        {/* album section */}
        {this.state.albums &&
          <Albums title="albums" albumsData={this.state.albums} />}

      </div>

    );
  }
}

const styles = {
  container: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    position: 'absolute',
    top: '35vh',
    left: '45vw'
  }

}

export default Search;



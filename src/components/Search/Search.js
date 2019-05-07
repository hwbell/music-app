import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

// components
import SearchInput from '../Search/SearchInput'
import Albums from '../Search/Albums';

// tools
import { getWebToken } from '../../tools/getWebToken';

const fetch = require("node-fetch");

// Search is the master component that contains all things related to the user's search input
// contains SearchInput, SearchResults
class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // this.fetchSearch();
  }

  // for the Top songs and albums
  fetchSearch(query) {

    const self = this;

    // this is the form specified by apple
    let jwtToken = getWebToken();
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }

    // for a search query
    const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,albums,artists,playlists`;

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
        let playlists = json.results.playlists.data;

        console.log(songs.length + " songs returned");
        console.log(albums.length + " albums returned");
        console.log(artists.length + " artists returned");
        console.log(playlists.length + " playlists returned");

        self.setState({
          songs,
          albums,
          artists,
          playlists
        });

      })
      .catch((e) => console.log(e))

  }

  // handleSubmit and handleChange will be passed to the SearchInput component
  // handleSubmit fires the search for new content
  handleSubmit(e) {
    console.log(`search fired => ${this.state.query}`)
    e.preventDefault();

    this.fetchSearch(this.state.query);
  }

  // handleChange changes the value of the current query
  handleChange(value) {
    this.setState({
      query: value
    });
  }

  render() {
    return (

      <div className="col" style={styles.container}>

        {/* search bar */}
        <SearchInput 
          query={this.state.query}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>

        {/* album section */}
        <Albums albumsData={this.state.albums}/>

        {/* songs section */}

        {/* playlist section */}

      </div>

    );
  }
}

const styles = {
  container: {
    padding: '5px'
  },


}

export default Search;



import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

// tools
import { getWebToken } from '../tools/getWebToken';

const fetch = require("node-fetch");

// Search
class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderCard = this.renderCard.bind(this);
  }

  componentDidMount() {
    this.fetchSearch();
  }

  // for the Top songs and albums
  fetchSearch() {

    // this is the form specified by apple
    let jwtToken = getWebToken();
    const headers = {
      Authorization: `Bearer ${jwtToken}`
    }

    // for a search query
    const searchUrl = `https://api.music.apple.com/v1/catalog/us/search?term=${query}&limit=25&types=songs,artists,albums`;

    fetch(searchUrl, {
      method: 'GET',
      headers
    })
      .then(res => res.json())
      // for searches
      // .then(json => console.log(json.results.artists.data[0].relationships.albums.data[2]))

      // for charts
      .then((json) => {

        let albums = json.results.albums.data;
        let artists = json.results.artists.data
        console.log(albums.length + " albums returned");
        console.log(artists.length + " artists returned")

        console.log(`*************************Top Artist***********************`);

        artists.map((artist) => {
          console.log(artist.attributes)
        })
        let artistData = artists.map((artist, i) => {
          let { name, url, genreNames } = artist.attributes;
          return {
            name,
            url,
            genreNames
          }
        })

        // console.log(artistData);

        console.log(`**********************************************************`);

        console.log(`*************************Top 5 Albums***********************`);

        console.log(albums[0].attributes)
        let albumData = albums.map((album, i) => {
          let { artwork, artistName, url, genreNames } = album.attributes;
          return {
            artwork,
            artistName,
            url,
            genreNames
          }
        })

        // console.log(albumData);


        console.log(`**********************************************************`);

      })
      .catch((e) => console.log(e))

  }

  render() {
    return (

      <div className="col" style={styles.container}>


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



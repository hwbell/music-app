import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import AlbumCard from './AlbumCard';
import AlbumDetail from './AlbumDetail';

// 
class Albums extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
    this.renderCards = this.renderCards.bind(this);
  }

  componentDidMount() {

  }

  renderCards(albumsData) {

    return (

      albumsData.map((album, i) => {

        let artUrl = album.attributes.artwork.url;

        // slice off the ending '{w}x{h}bb.jpeg' part of the url. we can replace it
        // with '200x200bb.jpeg' for example. width + height can be assigned this way
        let slicePoint = artUrl.indexOf('{w}');

        let picUrl = artUrl.slice(0, slicePoint) + '500x500bb.jpeg';
        let fullName = album.attributes.name;
        let tooLong = fullName.length > 40;

        let title = tooLong ? fullName.toLowerCase().slice(0, 40) + '...' : fullName.toLowerCase();
        return (

          <AlbumCard key={i} title={title} picUrl={picUrl} />
        )
      })
    )
  }

  render() {

    // keep track of which one has been clicked, starting with just the first 
    // in the list.
    let activeIndex = this.state.activeIndex;

    return (

      <div className="container" style={styles.container}>

        {this.props.albumsData &&

          <div className="row">

            <div className="col-sm-8">
              <AlbumDetail album={this.props.albumsData[activeIndex]} />
            </div>

            <div className="col-sm-4">

              <div className="row" style={styles.cardsHolder}>
                {this.renderCards(this.props.albumsData)}
              </div>

            </div>

          </div>


        }

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

}

export default Albums;



import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import AlbumCard from './AlbumCard';
import AlbumDetail from './AlbumDetail';
import { Button } from 'reactstrap';

// tools
import { getUsablePicUrl } from '../../tools/functions';

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
  }

  componentDidMount() {
    // prefetchImages();
  }

  // do this to pre-fetch the images, so they dont delay
  prefetchImages() {
    // this.props.albumsData.forEach((album) => {
    //   const img = new Image();
    //   img.src = getUsablePicUrl(album.attributes.artwork.url, 500);
    //   console.log(img.src)
    // });
  }

  toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleClick(key) {
    this.setState({
      activeIndex: key
    })
  }

  // renders the cards for the albums. control how many are rendered with the length argument
  renderCards(albumsData, length) {

    return (

      albumsData.map((album, i) => {

        if (i < length) {

          let artUrl = album.attributes.artwork.url;

          // get a usable url with real size
          let picUrl = getUsablePicUrl(artUrl, 500);

          let fullName = album.attributes.name;
          let tooLong = fullName.length > 40;

          let title = tooLong ? fullName.toLowerCase().slice(0, 40) + '...' : fullName.toLowerCase();
          
          return (

            <AlbumCard handleClick={this.handleClick} key={i} index={i} title={title} picUrl={picUrl} />
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
            <AlbumDetail album={this.props.albumsData[activeIndex]} />
          </div>

          {/* the album cards to select from */}
          <div className="col-sm-6">

            <div className="row" style={styles.cardsHolder}>
              {this.state.expanded ?
                this.renderCards(this.props.albumsData, this.props.albumsData.length)
                : this.renderCards(this.props.albumsData, 9)
              }
            </div>

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



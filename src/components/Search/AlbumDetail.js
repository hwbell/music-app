import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

// 
class Albums extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {

    let album = this.props.album;
    let artUrl = album.attributes.artwork.url;

    // slice off the ending '{w}x{h}bb.jpeg' part of the url. we can replace it
    // with '200x200bb.jpeg' for example. width + height can be assigned this way
    let slicePoint = artUrl.indexOf('{w}');

    let picUrl = artUrl.slice(0, slicePoint) + '1000x1000bb.jpeg';

    return (

      <Card style={{ border: 'none' }}>
        <CardImg style={styles.cardImg} src={picUrl} alt="Card image cap" />

      </Card>

    );
  }
}

const styles = {
  container: {
  },
  cardImg: {
    width: '100%',
    // height: '260px',
  },
  imageOverlay: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  cardsHolder: {
    maxWidth: '1200px',
    margin: 'auto auto'
    // minWidth: '300px'
  },
  cardContainer: {
    padding: '1vw'
    // width: '200px',
    // height: '200px'
  },
  cardText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bolder',
    fontSize: '14px',
    // margin: 'auto auto'
  },
  cardTitle: {
    textAlign: 'center',
    color: 'white',
    // margin: 'auto auto',
    // margin: 'auto auto'
  },


}

export default Albums;



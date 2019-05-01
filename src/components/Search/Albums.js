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
        let title = album.attributes.name.toLowerCase().slice(0, 20) + '...';
        return (

          <div className="col-sm-6 col-md-3 col-lg-2" style={styles.cardContainer}>
            <Card style={{ border: 'none' }}>
              <CardImg style={styles.cardImg} src={picUrl} alt="Card image cap" />

              <CardImgOverlay style={styles.imageOverlay}>
                <CardText style={styles.cardText}>{title}</CardText>
              </CardImgOverlay>

            </Card>
          </div>
        )
      })
    )
  }

  render() {
    return (

      <div className="container row" style={styles.container}>

        {this.props.albumsData &&

          <div className="col-8">

            <div className="row" style={styles.cardsHolder}>
              {this.renderCards(this.props.albumsData)}
            </div>
          
          </div>

        }

      </div>

    );
  }
}

const styles = {
  container: {
    // 
    height: '400px'
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



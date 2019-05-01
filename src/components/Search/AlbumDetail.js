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
    let picUrl = album.attributes.artwork.url;
    let 

    return (

      <Card style={{ border: 'none' }}>
        <CardImg style={styles.cardImg} src={picUrl} alt="Card image cap" />

        <CardImgOverlay style={styles.imageOverlay}>
          <CardText style={styles.cardText}>{title}</CardText>
        </CardImgOverlay>

      </Card>

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



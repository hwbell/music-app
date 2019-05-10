import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

// tools
import { getUsablePicUrl } from '../../tools/functions';

// 
class Featured extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderCard = this.renderCard.bind(this);
  }

  componentDidMount() {

  }

  // for each of the two top cards, #1 album and #1 song
  renderCard(props) {

    // console.log(props)
    
    let picUrl = getUsablePicUrl(props.artwork.url, 1000)

    return (
      <div className="col-6" style={styles.cardContainer}>
        <Card className="featured-detail-card" style={styles.card}>
          <CardImg style={styles.cardImg} src={picUrl} alt="Card image cap" />
          <CardImgOverlay style={styles.imageOverlay}>

            <CardTitle style={styles.cardTitle}>featured {props.type}</CardTitle>
            <CardText style={styles.cardText}>{props.name.toLowerCase()}</CardText>
            <CardText style={styles.cardTitle}>{props.artistName}</CardText>

          </CardImgOverlay>
        </Card>
      </div>
    )
  }

  render() {

    let randomInt = Math.floor(Math.random() * Math.floor(10));
    
    return (

        <div className="row" style={styles.container}>
          {this.renderCard(this.props.topAlbumsData[randomInt])}
          {this.renderCard(this.props.topSongsData[randomInt])}
        </div>

    );
  }
}

const styles = {
  container: {
    // maxWidth: '900px',
    margin: '40px auto'
    // minWidth: '300px'
  },
  cardContainer: {
    minWidth: '300px',
    maxWidth: '450px',
    margin: 'auto auto'
    // height: '300px',
  },
  card: {
    border: 'none'
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
  cardText: {
    textAlign: 'center',
    color: 'white',
    fontSize: '26px',
    // margin: 'auto auto'
  },
  cardTitle: {
    textAlign: 'center',
    color: 'white',
    // margin: 'auto auto',
    // margin: 'auto auto'
  },

}

export default Featured;



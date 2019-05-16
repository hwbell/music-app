import React, { Component } from 'react';

// style / animation
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//  components
import { Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';


// 
class MediaCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 
    }

  }

  componentDidMount() {

  }

  render() {
    let fontSize = this.props.fontSize || '12px';

    let titleStyle = {
      textAlign: 'center',
      padding: 0,
      margin: 0,
      fontWeight: 'bolder',
      fontSize
      // margin: 'auto auto'
    };

    let subtitleStyle = {
      textAlign: 'center',
      // color: 'black',
      fontWeight: 'bolder',
      fontSize: `calc(${fontSize} - 5px)`
    };

    return (

      <div className={this.props.className} style={styles.cardContainer}>
        {/* <Card style={{ border: 'none' }}>
          <CardImg top width="100%" style={styles.cardImg} src={this.props.picUrl} alt="Card image cap" />

          <CardBody style={styles.imageOverlay}>

            <CardText style={titleStyle}>{this.props.title}</CardText>
            {this.props.subtitle &&

              <CardText style={styles.subtitle}>{this.props.subtitle}</CardText>}

          </CardBody>}

        </Card> */}
        <Card>
          <CardImg src={this.props.picUrl} alt="Card image cap" />
          <CardBody style={styles.cardBody}>

            <CardText style={titleStyle}>{this.props.title}</CardText>

            {this.props.subtitle &&
              <CardText style={styles.subtitle}>{this.props.subtitle}</CardText>}

          </CardBody>

        </Card>
        
      </div>

    );
  }
}

const styles = {
  container: {
    // 
    width: '100%'
  },
  cardContainer: {
    padding: '0px',
    margin: '0px',
    minWidth: '100px',
    // height: '200px'
  },
  cardImg: {
    // height: '100%',
  },
  cardBody: {
    position: 'absolute',
    width: '100%',
    height: '20%',
    bottom: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

}

export default MediaCard;



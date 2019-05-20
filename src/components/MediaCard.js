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

    let displayName = `${this.props.title} by ${this.props.subtitle}`;

    return (

      <div className={this.props.className} style={styles.cardContainer}>
        <Card>
          <CardImg src={this.props.picUrl} alt="Card image cap" />
          <CardBody style={styles.cardBody}>

            {this.props.type === 'Songs' ?
              <Button color='link' style={titleStyle}
                onClick={() => this.props.handleClick(this.props.previewUrl, displayName)}>
                {this.props.title}</Button>
              :
              <p style={titleStyle}>
                {this.props.title}</p>}

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



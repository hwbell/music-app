import React, { Component } from 'react';

// style / animation
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';


// 
class MediaOverlayCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      overlay: false
    }
    this.onExit = this.onExit.bind(this);
    this.onHover = this.onHover.bind(this);

  }

  componentDidMount() {

  }

  onHover() {
    this.setState({
      overlay: true
    })
  }

  onExit() {
    this.setState({
      overlay: false
    })
  }

  render() {
    let fontSize = this.props.fontSize || '12px';

    let titleStyle = {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bolder',
      fontSize
      // margin: 'auto auto'
    };

    return (

      <div className={this.props.className} style={styles.cardContainer}>
        <Card style={{ border: 'none' }}
          onClick={() => this.props.handleClick(this.props.index)}
          onMouseOver={this.onHover}
          onMouseLeave={this.onExit}>

          <CardImg style={styles.cardImg} src={this.props.picUrl} alt="Card image cap" />

          {/* use ReactCSSTransitionGroup for the fade in/out  */}
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.state.overlay &&
              <CardImgOverlay style={styles.imageOverlay}>
                <CardText style={titleStyle}>{this.props.title}</CardText>
                {this.props.subtitle &&
                  <CardText style={styles.subtitle}>{this.props.subtitle}</CardText>}
              </CardImgOverlay>}
          </ReactCSSTransitionGroup>

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
  subtitle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bolder',
    fontSize: 'calc(10px+2vw)',
  },
  imageOverlay: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 10, 40, 0.65)'
  },


}

export default MediaOverlayCard;



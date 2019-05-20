import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

// this is the top most component heading the page, along with the Navigator component 
class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (

      <div className="container" style={styles.container}>

        <hr></hr>

        <div style={styles.iconContainer}>
          <a target="_blank"
            href="https://www.apple.com/apple-music/"
            color="link">
            <i className="fab fa-apple footer-apple"></i></a>

          <a target="_blank"
            href="https://developer.apple.com/documentation/applemusicapi"
            color="link">
            <i className="fas fa-code footer-code"></i></a>

          <a target="_blank"
            href="https://www.apple.com/itunes/"
            color="link">
            <i className="fab fa-itunes-note footer-note"></i></a>
        </div>


      </div>

    );
  }
}

const styles = {
  iconContainer: {
    height: '100px',
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
}

export default Footer;



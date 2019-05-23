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

        <div style={styles.footerContainer}>

          <div style={styles.textContainer}>
            <p style={styles.footerText}>This app was made with:</p>
          </div>

          <div style={styles.iconContainer}>
            <a target="_blank"
              href="https://www.apple.com/apple-music/"
              color="link">
              <i className="fab fa-apple footer-apple"></i></a>
            <p style={styles.footerText}>Apple Music</p>
          </div>

          <div style={styles.iconContainer}>
            <a target="_blank"
              href="https://developer.apple.com/documentation/applemusicapi"
              color="link">
              <i className="fas fa-code footer-note"></i></a>
            <p style={styles.footerText}>Developer API</p>
          </div>

          {/* <div style={styles.iconContainer}>
            <a target="_blank"
              href="https://www.apple.com/itunes/"
              color="link">
              <i className="fab fa-itunes-note footer-note"></i></a>
            <p style={styles.footerText}>Itunes</p>  
          </div> */}

        </div>


      </div>

    );
  }
}

const styles = {
  footerContainer: {
    height: '100px',
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: 'rgb(55, 30, 114)'
  }
}

export default Footer;



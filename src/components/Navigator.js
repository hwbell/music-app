import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AnchorLink from 'react-anchor-link-smooth-scroll'

//  components
import { Button } from 'reactstrap';

// styling
import Media from 'react-media';

// 
class Navigator extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderLogo = this.renderLogo.bind(this);
  }

  renderLogo() {
    return (
      <Media query="(max-width: 599px)">
        {matches =>
          matches ? (
            <p className="navlink" style={styles.logo}><i className="fab fa-apple"></i></p>
          ) : (
              <p className="navlink" style={styles.logo}><i className="fab fa-apple"></i> Music</p>
            )
        }
      </Media>
    )
  }

  componentDidMount() {

  }

  render() {
    return (
      
      <div className="nav" style={styles.container}>
        <div style={{marginLeft: '20px'}}>
          <AnchorLink offset='80' href='#search'>
            <Button color='link' className="navlink">
              <p style={styles.navlink}>Search</p>
            </Button>
          </AnchorLink>

          <AnchorLink offset='80' href='#browse'>
            <Button color='link' className="navlink">
              <p style={styles.navlink}>Browse</p>
            </Button>
          </AnchorLink>
        </div>

        <a style={{marginRight: '20px'}} target="_blank" href="https://www.apple.com/apple-music/">
          <Button color='link' className="navlink">
            {this.renderLogo()}
          </Button>
        </a>



        {/* <p style={styles.logo}><i className="fab fa-apple"></i> Music</p> */}

      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: '65px',
    position: 'fixed',
    zIndex: 3,
    top: '0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.95)'
  },
  logo: {
    padding: '0px',
    fontSize: 'calc(35px + 0.25vw)',
  },
  navlink: {
    padding: '0px',
    fontSize: 'calc(20px + 0.251vw)',
    textDecoration: 'none'
  }



}

export default Navigator;



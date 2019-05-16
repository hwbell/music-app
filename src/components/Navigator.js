import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AnchorLink from 'react-anchor-link-smooth-scroll'

//  components
import { Button } from 'reactstrap';

// styling
import Media from 'react-media';

// 
class Genres extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (

      <div className="nav" style={styles.container}>
        <div>
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

        <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              <p style={styles.logo}><i className="fab fa-apple"></i></p>
            ) : (
                <p style={styles.logo}><i className="fab fa-apple"></i> Music</p>
              )
          }
        </Media>

        {/* <p style={styles.logo}><i className="fab fa-apple"></i> Music</p> */}

      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    // height: '80px',
    position: 'fixed',
    zIndex: 3,
    top: '0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.95)'
  },
  logo: {
    padding: '0px',
    fontSize: 'calc(35px + 1vw)',
  },
  navlink: {
    padding: '0px',
    fontSize: 'calc(20px + 1vw)',
    textDecoration: 'none'
  }



}

export default Genres;



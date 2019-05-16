import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Button, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

// this is the top most component heading the page, along with the Navigator component 
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (

      <div className="header" style={styles.container}>

        <div style={styles.titlesHolder}>

          <p style={styles.text}>50 million songs</p>
          <p style={styles.text}>all your favorite artists</p>
          <p style={styles.text}>get lost & find something new</p>

        </div>

        {/* <Button className="button-signin" style={{margin: '20px'}}>
          sign in with apple
        </Button> */}

      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    minHeight: '270px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 'calc(24px + 0.5vw)',
    color: 'white'
  }


}

export default Header;



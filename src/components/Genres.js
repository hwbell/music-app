import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

// tools
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

// the private stuff

const { privateKeyId } = require('../env');
// console.log('key: ' + privateKeyId)
const teamId = process.env.REACT_APP_TEAM_ID;
const keyId = process.env.REACT_APP_KEY_ID;

// sign a token with the private stuff for auth to apple's api
const jwtToken = jwt.sign({}, privateKeyId, {
  algorithm: "ES256",
  expiresIn: "180d",
  issuer: teamId,
  header: {
    alg: "ES256",
    kid: keyId
  }
});

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

      <div className="row" style={styles.container}>

        

      </div>

    );
  }
}

const styles = {
  container: {
    // 
    width: '100%'
  },
  
   
}

export default Genres;



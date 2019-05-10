import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

// 
class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {


    return (

      <div className="text-center" style={styles.container}>

        {/* We'll do the top title if no text is provided */}
        {
          this.props.text ?
            <p className={this.props.className || "title"} style={styles.titleText}>{this.props.text}</p>
            : <p className={this.props.className || "title"} style={styles.titleText}>find your music</p>

        }

      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    margin: '40px auto'
  },
  titleText: {
    fontSize: 'calc(30px + 1vw)',
  }


}

export default Title;



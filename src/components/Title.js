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

    let titleStyle = {
      fontSize: 'calc(25px + 1vw)',
      color: this.props.color
    }

    return (

      <div className="text-center" style={styles.container}>

        {/* We'll do the top title if no text is provided */}
        {
          this.props.text &&
            <p className={this.props.className || "title"} style={titleStyle}>{this.props.text}</p>
        }

      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    margin: '10px auto'
  },

}

export default Title;



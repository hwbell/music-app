

import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import CardCarousel from './CardCarousel';
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
      <div style={styles.container} className="text-center row">
        {/* carousel of mixed albums */}
        {this.props.topAlbumsData &&
          <CardCarousel type="Albums" data={this.props.topAlbumsData} />}

        {/* carousel of mixed albums */}
        {this.props.topSongsData &&
          <CardCarousel type="Songs" data={this.props.topSongsData} />}
      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
  },


}

export default Genres;



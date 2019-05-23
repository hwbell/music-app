

import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import CardCarousel from './CardCarousel';

// 
class TopHundred extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={styles.container} className="row">
        {/* carousel of mixed albums */}
        {this.props.topAlbumsData &&
          <CardCarousel type="Albums" 
            data={this.props.topAlbumsData} />}

        {/* carousel of mixed albums */}
        {this.props.topSongsData &&
          <CardCarousel type="Songs" 
            data={this.props.topSongsData}
            handleClick={this.props.handleSongChange} />}
      </div>

    );
  }
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px'
    // border: '1px solid'
  },


}

export default TopHundred;



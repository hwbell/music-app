import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


// components
import TopCharts from './TopCharts';

// initial state for the component

class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch the chart data and search data to start
  }

  render() {
    return (
      <div className="App">

        {/* display the top song and album of the day, with the main icon */}
        <TopCharts />

        {/* display the search bar / results with song results on the left hand side */}
        {/* <Songs /> */}

        {/* display the small icon albums (not the top 3) from the search */}
        {/* <RestOfAlbums /> */}

        {/* display the top albums from the search */}
        {/* <TopAlbums /> */}

      </div>
    );
  }
}

export default MainPage;

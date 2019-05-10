import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';


// components
import TopCharts from './TopCharts';
import Title from './Title';
import Search from './Search/Search';

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
      <div className="main-page">

        {/* display the title */}
        <Title />

        {/* display the search bar / results with song results on the left hand side */}
        <Search />

        <hr></hr>

        {/* display the top song and album of the day, with the main icon */}
        <TopCharts />

        {/* display the small icon albums (not the top 3) from the search */}
        {/* <RestOfAlbums /> */}

      </div>
    );
  }
}

export default MainPage;

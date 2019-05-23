import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import MediaOverlayCard from '../MediaOverlayCard';
import MediaCard from '../MediaCard';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// tools
import { getUsablePicUrl, shuffle } from '../../tools/functions';
import Title from '../Title';

class CardCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

  }

  handleClick() {
    console.log('card clicked')
  }

  renderCards(data, startIndex) {

    // lets shuffled the results for the carousel. This way we are less likely
    // to end up with the same artwork for song and album
    // console.log(data.sort(() => Math.random() - 0.5))

    let shuffledData = data.sort(() => Math.random() - 0.5);
    return (
      <div>
        {shuffledData.map((data, i) => {
          let artUrl = data.attributes.artwork.url;
          let id = data.id;
          // get a usable url with real size
          let picUrl = getUsablePicUrl(artUrl, 500);
          let previewUrl = data.attributes.previews ? data.attributes.previews[0].url : null;

          let fullName = data.attributes.name;
          let artistName = data.attributes.artistName;
          let tooLong = fullName.length > 40;

          let title = tooLong ? fullName.toLowerCase().slice(0, 30) + '...' : fullName.toLowerCase();
          
          return (
            <Slide style={styles.slide} key={i} index={i}>

              <MediaCard key={i}
                type={this.props.type}
                handleClick={this.props.handleClick}
                fontSize="16px"
                className="album-card"
                index={startIndex + i}
                id={id}
                title={title}
                subtitle={artistName}
                picUrl={picUrl}
                previewUrl={previewUrl} />

            </Slide>
          )
        })}
      </div>
    )

  }

  render() {
    // console.log(this.props.data)
    return (

      <div className="col" style={styles.container}>

        <Title className="title-charts" color="rgb(221, 21, 98)" text={`Top 100 ${this.props.type}`} />

        <CarouselProvider
          className="album-card"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={this.props.data.length}
          orientation={"horizontal"}
        >
          <Slider>
            {this.renderCards(this.props.data, 0)}
          </Slider>

          {/* <div style={styles.buttonHolder}> */}
          <ButtonBack style={styles.backButton} className="button-pink">
            <i className="fas fa-chevron-left"></i>
          </ButtonBack>
          <ButtonNext style={styles.nextButton} className="button-pink">
          <i className="fas fa-chevron-right"></i>
          </ButtonNext>
          {/* </div> */}

        </CarouselProvider>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    minWidth: '300px',
    maxWidth: '450px',
    margin: 'auto auto'
    // height: '400px',
    // 
    // width: '100%'
  },
  slide: {
    // border: '1px solid black',
  },
  backButton: {
    position: 'absolute',
    left: '0px',
    top: '48%'
  },
  nextButton: {
    position: 'absolute',
    right: '0px',
    top: '48%'
  }
  // buttonHolder: {
  //   position: 'absolute',
  //   bottom: '0px',
  //   left: '40%'
  // }
}

export default CardCarousel;



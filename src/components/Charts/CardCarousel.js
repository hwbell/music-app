import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Button } from 'reactstrap';
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
          let artUrl = data.artwork.url;
          let id = data.id;
          // get a usable url with real size
          let picUrl = getUsablePicUrl(artUrl, 500);

          let fullName = data.name;
          let tooLong = fullName.length > 40;

          let title = tooLong ? fullName.toLowerCase().slice(0, 30) + '...' : fullName.toLowerCase();

          return (
            <Slide style={styles.slide} key={i} index={i}>
              <MediaCard key={i}
                fontSize="calc(20px+2vw)"
                className="album-card"
                handleClick={this.handleClick}
                index={startIndex + i}
                id={id}
                title={title}
                picUrl={picUrl} />
            </Slide>
          )
        })}
      </div>
    )

  }

  render() {
    // console.log(this.props.data)
    return (

      <div style={styles.container}>

        <Title className="title-charts" text={`Top ${this.props.type}`} />
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

          <div style={styles.buttonHolder}>
            <ButtonBack className="button-pink">back</ButtonBack>
            <ButtonNext className="button-pink">next</ButtonNext>
          </div>

        </CarouselProvider>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '80%',
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
  buttonHolder: {
    position: 'absolute',
    bottom: '0px',
    left: '40%'
  }
}

export default CardCarousel;



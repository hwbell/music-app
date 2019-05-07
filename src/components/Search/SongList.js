import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Card, CardTitle, CardText, CardImg, Collapse, Button, CardBody } from 'reactstrap';

// 
class Genres extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {

  }
  // this will be called at the end of the fetch call, so it won't expand until we have the songs
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (

      <div>
        <Button className="button-purple" onClick={this.toggle} style={{ marginBottom: '1rem' }}>+ songs</Button>
        <Collapse style={{ marginBottom: '20px' }} isOpen={!this.state.collapse}>
          <Card>
            <CardBody>
              Anim pariatur cliche reprehenderit,
               enim eiusmod high life accusamus terry richardson ad squid. Nihil
               anim keffiyeh helvetica, craft beer labore wes anderson cred
               nesciunt sapiente ea proident.
          </CardBody>
          </Card>
        </Collapse>
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



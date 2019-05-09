import React, { Component } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';

//  components
import { Input, Form, InputGroup, Button } from 'reactstrap';

// 
class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (

      <div className="container" style={styles.container}>

        <Form onSubmit={this.props.handleSubmit}
          style={styles.searchHolder}>

          <InputGroup>
            <Input placeholder={this.props.query || "search"} 
              value={this.props.query}
              style={styles.searchInput}
              onChange={(e) => this.props.handleChange(e.target.value)}
            />

            <Button color="link"
              type="submit"
              style={styles.button}>
              <i className="fas fa-search" style={styles.icon}></i>
            </Button>
          </InputGroup>

        </Form>

      </div>

    );
  }
}

const styles = {
  container: {
    width: '250px',
    marginBottom: '40px'
  },
  searchHolder: {

  },
  searchInput: {
    border: 'none'
  },
  button: {
  
  },
  icon: {
    fontSize: '20px',
    padding: '6px',
    color: 'rgb(84, 26, 219)'
  }

}

export default SearchInput;



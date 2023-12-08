import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { data: '' };
    }

    updateData = (apiResponse) => {
        this.setState({ data: apiResponse });
    };
    
      fetchData = () => {
        fetch('http://127.0.0.1:5000/books')
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              console.log('HTTP error:' + response.status + ':' + response.statusText);
              return [['status ', response.status]];
            }
          }) 
          .then((jsonOutput) => {
            this.updateData(jsonOutput);
          })
          .catch((error) => {
            console.log(error);
            this.updateData('');
          });
    };

    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        if (this.state.data === null || this.state.data === '') {
          return (
            <div className="App">
              <p>No data returned from server</p>
            </div>
          );
        } else {
          return (
            <Container className="App">
              <Row>
                <Col>
                    <div className="bookBox">
                    {Object.keys(this.state.data).map((i) => (
                      <div className="book" key={i}>
                        <div className='bookTitle'>
                        <h1>{this.state.data[i][1]}</h1>
                        </div>
    
                        <div className='bookAuthor'>
                        <h2>{this.state.data[i][2]}</h2>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          );
        }
      }    
}

export default Books;
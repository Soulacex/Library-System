import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, Alert } from 'reactstrap';
import BookModal from './BookModal';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '', modal: false, currentBook: null };
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

  editBook = (id, title, author) => {
    let url = 'http://127.0.0.1:5000/books';
    let jData = JSON.stringify({
      ID: id,
      title: title,
      author: author
    });
    fetch(url, {
      method: 'PUT',
      body: jData,
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => {
      if (response.status === 200)
        return (response.json());
      else
        return ([["status ", response.status]]);
    })
    .then((jsonOutput) => {
      this.fetchData();
    })
    .catch((error) => {
      console.log(error);
      this.fetchData();
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  toggleModal = (book) => {
    this.setState({ modal: !this.state.modal, currentBook: book });
  }

  saveBook = (title, author) => {
    this.editBook(this.state.currentBook[0], title, author);
  
    const updatedBooks = this.state.data.map(book => {
      if (book[0] === this.state.currentBook[0]) {
        return [book[0], title, author];
      } else {
        return book;
      }
    });
    this.setState({ data: updatedBooks });
  
    this.toggleModal(null);
  };  

  closeModal = () => {
    this.setState({ modal: false });
  }

  render() {
    if (this.state.data === null || this.state.data === '') {
      return (
        <Container className="App" style={{ backgroundColor: '#e0f7fa' }}>
          <Row>
            <Col>
              <Alert color="danger">No data returned from server</Alert>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className="App" style={{ backgroundColor: '#e0f7fa' }}>
          <Row xs="1" sm="2" md="3" lg="4" xl="5">
            {Object.keys(this.state.data).map((i) => (
              <Col key={i}>
                <Card className="mb-4 text-center">
                  <CardBody>
                    <CardTitle tag="h4" style={{ color: 'blue' }}>{this.state.data[i][1]}</CardTitle>
                    <CardText tag="h5" style={{ color: 'green' }}>{this.state.data[i][2]}</CardText>
                    <Button onClick={() => this.toggleModal(this.state.data[i])} color="primary">Edit</Button>
                    <DeleteBook book={this.state.data[i]} fetchData={this.fetchData} />
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          {this.state.modal && <BookModal showHide={this.state.modal} cancel={this.closeModal} book={this.state.currentBook} callback={this.saveBook} />}        
          <Row>
            <Col className="text-center mt-3">
              <AddBook fetchData={this.fetchData} />
            </Col>
          </Row>
        </Container>
      );
    }
  }  
}

export default Books;
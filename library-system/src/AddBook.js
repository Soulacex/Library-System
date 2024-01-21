import React, { Component } from 'react';
import { Button } from 'reactstrap';
import BookModal from './BookModal';  

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  showNewBookModal = () => {
    this.setState({ showModal: true });
  }

  closeNewBookModal = () => {
    this.setState({ showModal: false });
  }

  newBook = (_title, _author) => {
    this.closeNewBookModal();
    let url = 'http://127.0.0.1:5000/books';  
    let jData = JSON.stringify({
      title: _title,
      author: _author,
    });
    fetch(url, {
      method: 'POST',
      body: jData,
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then((response) => {
        if (response.status === 200)
          return (response.json());
        else
          return ([["status ", response.status]]);
      })
      .then((jsonOutput) => {
        this.props.fetchData();
      })
      .catch((error) => {
        console.log(error);
        this.props.fetchData();
      });
  }

  render() {
    return (
      <div>
        <Button color='primary' onClick={this.showNewBookModal}>Add Book</Button>
        {this.state.showModal && <BookModal showHide={this.state.showModal} cancel={this.closeNewBookModal} callback={this.newBook} />}
      </div>
    );
  }
}

export default AddBook;

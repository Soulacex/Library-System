import React from 'react';
import { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, Input, InputGroupText } from 'reactstrap';

class BookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.book ? props.book[1] : "",
      author: props.book ? props.book[2] : ""
    };
  }

  toggle = () => {
    this.props.cancel();
  }

  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  updateAuthor = (e) => {
    this.setState({ author: e.target.value });
  }

  saveChanges = () => {
    this.props.callback(this.state.title, this.state.author);
  }

  render() {
    return (
      <Modal isOpen={this.props.showHide} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
        <ModalBody>
          <InputGroup>
            <InputGroupText>Title</InputGroupText>
            <Input placeholder="New Book Title" value={this.state.title} onChange={this.updateTitle} />
          </InputGroup><br></br>
          <InputGroup>
            <InputGroupText>Author</InputGroupText>
            <Input placeholder="New Book Author" value={this.state.author} onChange={this.updateAuthor} />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          <Button color="primary" onClick={this.saveChanges}>Save</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default BookModal;
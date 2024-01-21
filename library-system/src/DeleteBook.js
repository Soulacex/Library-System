import React from 'react';
import { Button } from 'reactstrap';

const DeleteBook = ({ book, fetchData }) => {
  const deleteBook = (id) => {
    let url = 'http://127.0.0.1:5000/books';  
    let jData = JSON.stringify({ ID: id });
    fetch(url, {
      method: 'DELETE',
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
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        fetchData();
      });
  };

  return (
    <Button onClick={() => deleteBook(book[0])}>Delete</Button>
  );
};

export default DeleteBook;
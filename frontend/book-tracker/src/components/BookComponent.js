import React from 'react';



function BookComponent({ book, selectBook }) {
  return (
    <div onClick={() => selectBook(book)}>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <img src={book.image} alt={book.title} />
      <p>Status: {book.status}</p>
    </div>
  );
}

export default BookComponent;

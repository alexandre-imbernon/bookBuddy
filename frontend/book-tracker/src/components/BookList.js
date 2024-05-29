import React from 'react';
import BookComponent from './BookComponent';

function BookList({ books, selectBook, deleteBook }) {
  return (
    <div>
      {books.map(book => (
        <BookComponent key={book._id} book={book} selectBook={selectBook} deleteBook={deleteBook} />
      ))}
    </div>
  );
}

export default BookList;

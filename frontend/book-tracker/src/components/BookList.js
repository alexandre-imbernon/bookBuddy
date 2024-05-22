import React from 'react';
import BookComponent from './BookComponent';

function BookList({ books, selectBook }) {
  return (
    <div>
      {books.map(book => (
        <BookComponent key={book.id} book={book} selectBook={selectBook} />
      ))}
    </div>
  );
}

export default BookList;

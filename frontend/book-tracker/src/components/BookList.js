import React from 'react';
import BookComponent from './BookComponent';

function BookList({ books, selectBook, deleteBook, addToFavorites }) {
  return (
    <div>
      {books.map(book => (
        <BookComponent
          key={book.id}
          book={book}
          selectBook={selectBook}
          deleteBook={deleteBook}
          addToFavorites={addToFavorites}
        />
      ))}
    </div>
  );
}

export default BookList;

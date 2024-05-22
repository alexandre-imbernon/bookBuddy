import React from 'react';
import BookComponent from '../components/BookComponent';

function FavoritesPage({ books, favorites }) {
  const favoriteBooks = books.filter(book => favorites.includes(book.id));

  return (
    <div>
      <h2>Favorite Books</h2>
      {favoriteBooks.length > 0 ? (
        favoriteBooks.map(book => <BookComponent key={book.id} book={book} />)
      ) : (
        <p>No favorite books yet.</p>
      )}
    </div>
  );
}

export default FavoritesPage;

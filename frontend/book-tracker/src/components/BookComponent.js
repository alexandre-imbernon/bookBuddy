import React from 'react';

function BookComponent({ book, selectBook, deleteBook,  addToFavorites }) {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Pages: {book.pages}</p>
      <p>Catégorie: {book.category}</p>
      <button onClick={() => addToFavorites(book)}>Favoris</button>
      <button onClick={() => selectBook(book)}>Voir détails</button>
      <button onClick={() => deleteBook(book._id)}>Supprimer</button>
    </div>
  );
}

export default BookComponent;

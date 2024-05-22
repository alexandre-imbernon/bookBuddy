import React from 'react';
import BookForm from '../components/BookForm';




function AddBookPage({ addBook }) {
  return (
    <div>
      <h2>Ajouter un livre</h2>
      <BookForm addBook={addBook} />
    </div>
  );
}

export default AddBookPage;

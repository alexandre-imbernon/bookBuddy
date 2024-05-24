import React, { useEffect } from 'react';
import BookForm from '../components/BookForm';

function AddBookPage({ addBook }) {
    useEffect(() => {
        async function postBooks(addBook) {
            try {
                const response = await fetch('http://localhost:5000/api/addBook');
                const data = await response.json();

                console.log(data);
            } catch (error) {
                console.error('Erreur lors de la récupération de tous les livres', error);
            }
        }

        postBooks();
    }, []);

  return (
    <div>
      <h2>Ajouter un livre</h2>
      <BookForm addBook={addBook} />
    </div>
  );
}

export default AddBookPage;

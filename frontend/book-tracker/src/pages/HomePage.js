import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import BookModal from '../components/BookModal';

// CSS styles en JS
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh', // Utiliser min-height pour garantir que l'arrière-plan couvre toute la page
    background: 'linear-gradient(#5d625e, #A89D89)',
    fontFamily: 'Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: '20px',
    backgroundColor: '#D2C2A7',
    fontFamily: 'Roboto, sans-serif',
  },
  searchBar: {
    width: '300px',
    padding: '10px',
  },
  bookList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr', // Trois colonnes de taille égale
    gap: '20px', // Espacement entre les éléments
    padding: '20px',
    width: '100%',
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};


function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getAllBooks() {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de tous les livres', error);
      }
    }

    getAllBooks();
  }, []);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleUpdateBookState = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter(book => book._id !== bookId));
      } else {
        console.error('Échec de la suppression du livre');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du livre:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (filter === '' || book.category.toLowerCase() === filter.toLowerCase())
  );

  const addToFavorites = async (bookId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token non trouvé. Veuillez vous connecter.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/book/${bookId._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Livre ajouté aux favoris avec succès.');
      } else {
        console.error('Échec de l\'ajout du livre aux favoris.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre aux favoris:', error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <SearchBar style={styles.searchBar} setSearchQuery={setSearchQuery} setFilter={setFilter} />
      </header>
      <div style={styles.bookList}>
        <BookList books={filteredBooks} selectBook={handleSelectBook} deleteBook={handleDeleteBook} addToFavorites={addToFavorites} />
      </div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          updateBookState={handleUpdateBookState}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default HomePage;

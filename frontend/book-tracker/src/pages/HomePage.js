import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import BookModal from '../components/BookModal';

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
    <div>
      <SearchBar setSearchQuery={setSearchQuery} setFilter={setFilter} />
      <BookList books={filteredBooks} selectBook={handleSelectBook} deleteBook={handleDeleteBook} addToFavorites={addToFavorites} />
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

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import BookDetailPage from './pages/BookDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import RewardsPage from './pages/RewardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/NavBar';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch books and user data from server (mocked here)
    // fetchBooks();
    // fetchUserData();
  }, []);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const selectBook = (book) => {
    setSelectedBook(book);
  };

  const updateBookState = (updatedBook) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  const addFavorite = (bookId) => {
    const updatedFavorites = [...favorites, bookId];
    setFavorites(updatedFavorites);
    // Save to server or local storage
  };

  const removeFavorite = (bookId) => {
    const updatedFavorites = favorites.filter(id => id !== bookId);
    setFavorites(updatedFavorites);
    // Save to server or local storage
  };

  const login = (userData) => {
    setUser(userData);
    // Save user data to local storage or server
  };

  const logout = () => {
    setUser(null);
    // Remove user data from local storage or server
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<HomePage books={books} selectBook={selectBook} />} />
          <Route path="/add" element={user ? <AddBookPage addBook={addBook} /> : <Navigate to="/login" />} />
          <Route path="/book/:id" element={user ? <BookDetailPage books={books} updateBookState={updateBookState} addFavorite={addFavorite} removeFavorite={removeFavorite} favorites={favorites} /> : <Navigate to="/login" />} />
          <Route path="/favorites" element={user ? <FavoritesPage books={books} favorites={favorites} /> : <Navigate to="/login" />} />
          <Route path="/rewards" element={user ? <RewardsPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage login={login} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

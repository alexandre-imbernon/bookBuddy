import React, { useState, useEffect } from 'react';
import BookComponent from '../components/BookComponent';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(#5d625e, #A89D89)',
  },
  title: {
    margin: '20px 0',
    fontSize: '24px',
    color: 'white',
    textAlign: 'center',
  },
  message: {
    color: 'white',
  },
};

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token non trouvé. Veuillez vous connecter.');
        return;
      }

      console.log('Token:', token); // Ajoutez cette ligne pour déboguer le token

      try {
        const response = await fetch('http://localhost:5000/api/book/favorites', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          const errorText = await response.text();
          console.error('Échec de la récupération des livres favoris:', errorText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des livres favoris:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Livres Favoris</h2>
      {favorites.length > 0 ? (
        favorites.map(book => <BookComponent key={book._id} book={book} />)
      ) : (
        <p style={styles.message}>Pas encore de livres favoris.</p>
      )}
    </div>
  );
}

export default FavoritesPage;
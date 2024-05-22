import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function BookDetailPage({ books, updateBookState, addFavorite, removeFavorite, favorites }) {
  const { id } = useParams();
  const book = books.find(book => book.id === parseInt(id));
  const [lastPageRead, setLastPageRead] = useState(book.lastPageRead || 0);
  const isFavorite = favorites.includes(book.id);

  const handleUpdateLastPageRead = () => {
    const updatedBook = { ...book, lastPageRead };
    updateBookState(updatedBook);
  };

  if (!book) return <div>Book not found</div>;

  const progress = (lastPageRead / book.pages) * 100;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <img src={book.image} alt={book.title} />
      <p>Pages: {book.pages}</p>
      <p>Category: {book.category}</p>
      <p>Status: {book.status}</p>
      {book.status === 'en cours de lecture' && (
        <div>
          <label>
            Last page read:
            <input
              type="number"
              value={lastPageRead}
              onChange={(e) => setLastPageRead(parseInt(e.target.value))}
            />
          </label>
          <button onClick={handleUpdateLastPageRead}>Update</button>
          <div>
            Progress:
            <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
              <div style={{ width: `${progress}%`, backgroundColor: '#76c7c0' }}>{`${progress.toFixed(2)}%`}</div>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => (isFavorite ? removeFavorite(book.id) : addFavorite(book.id))}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default BookDetailPage;

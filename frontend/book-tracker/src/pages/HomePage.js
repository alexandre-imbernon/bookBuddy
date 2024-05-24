import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';

function HomePage({ books, selectBook }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (filter === '' || book.category === filter)
  );

    const [Boooks, setBooks] = useState([]);

    useEffect(() => {
        async function getAllBooks() {
            try {
                const response = await fetch('http://localhost:5000/api/books');
                const data = await response.json();

                setBooks(data)
                console.log(data);
            } catch (error) {
                console.error('Erreur lors de la récupération de tous les livres', error);
            }
        }

        getAllBooks();
    }, []);

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} setFilter={setFilter} />
      <BookList books={filteredBooks} selectBook={selectBook} />
        {Boooks.map((bokk, index) => (
            <div>
                <h3 key={index}>{bokk.title}</h3>
                <p>{bokk.author}</p>
                <p>nombre de pages totales :{bokk.pages} pages</p>
            </div>
        ))}
    </div>
  );
}

export default HomePage;

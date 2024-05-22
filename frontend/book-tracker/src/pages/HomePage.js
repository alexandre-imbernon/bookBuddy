import React, { useState } from 'react';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';






function HomePage({ books, selectBook }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (filter === '' || book.category === filter)
  );

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} setFilter={setFilter} />
      <BookList books={filteredBooks} selectBook={selectBook} />
    </div>
  );
}

export default HomePage;

import React from 'react';

function SearchBar({ setSearchQuery, setFilter }) {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Rechercher par titre" 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">Toutes les catégories</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-fiction</option>
        <option value="mystery">Mystery</option>
        <option value="science-fiction">Science-Fiction</option>
        <option value="fantasy">Fantasy</option>
        <option value="adventure">Adventure</option>
        {/* Ajoutez d'autres options selon vos catégories */}
      </select>
    </div>
  );
}

export default SearchBar;

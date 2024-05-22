import React from 'react';

function SearchBar({ setSearchQuery, setFilter }) {
  return (
    <div>
      <input type="text" placeholder="Rechercher" onChange={(e) => setSearchQuery(e.target.value)} />
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">Toutes catégories</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-fiction</option>
        {/* Ajoutez plus de catégories si nécessaire */}
      </select>
    </div>
  );
}

export default SearchBar;

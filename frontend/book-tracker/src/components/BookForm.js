import React, { useState } from 'react';

function BookForm({ onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('à lire');
  const [pages, setPages] = useState('');
  const [category, setCategory] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      image,
      status,
      pages,
      category
    };

    try {
      const response = await fetch('http://localhost:5000/api/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Livre ajouté avec succès
        onBookAdded(newBook); // Met à jour l'état parent
        setTitle('');
        setAuthor('');
        setImage('');
        setStatus('à lire');
        setPages('');
        setCategory('');
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="à lire">À lire</option>
        <option value="en cours de lecture">En cours de lecture</option>
        <option value="fini">Fini</option>
      </select>
      <input type="number" placeholder="Nombre de pages" value={pages} onChange={(e) => setPages(e.target.value)} required />
      <input type="text" placeholder="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <button type="submit">Ajouter le livre</button>
    </form>
  );
}

export default BookForm;
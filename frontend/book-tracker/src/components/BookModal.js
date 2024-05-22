import React, { useState } from 'react';
import Modal from 'react-modal';

function BookModal({ book, updateBookState, closeModal }) {
  const [status, setStatus] = useState(book.status);

  const handleChangeStatus = () => {
    const updatedBook = { ...book, status };
    updateBookState(updatedBook);
    closeModal();
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <img src={book.image} alt={book.title} />
      <p>Pages: {book.pages}</p>
      <p>Catégorie: {book.category}</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="à lire">À lire</option>
        <option value="en cours de lecture">En cours de lecture</option>
        <option value="fini">Fini</option>
      </select>
      <button onClick={handleChangeStatus}>Modifier l'état</button>
      <button onClick={closeModal}>Fermer</button>
    </Modal>
  );
}

export default BookModal;

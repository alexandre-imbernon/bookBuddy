import React from 'react';
import BookForm from '../components/BookForm';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(#5d625e, #A89D89)',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    color: 'white',
    textAlign: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '500px',
    margin: '0 auto',
  }
};

function AddBookPage() {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Ajouter un livre</h2>
      <div style={styles.formContainer}>
        <BookForm />
      </div>
    </div>
  );
}

export default AddBookPage;
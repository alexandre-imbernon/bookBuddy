import React, { useState } from 'react';

// CSS styles in JS
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(#5d625e, #A89D89)',
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
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto', // Ensures the form container itself is centered horizontally
    fontFamily: 'Roboto, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    fontFamily: 'Roboto, sans-serif',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    color: 'white',
    fontSize: '16px',
    marginBottom: '10px',
    fontFamily: 'Roboto, sans-serif',
  },
  input: {
    display: 'block',
    width: '100%',
    maxWidth: '300px',
    padding: '10px',
    margin: '10px 0', // Ensures the input fields are centered within the form
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#D2C2A7',
    fontFamily: 'Roboto, sans-serif',
  },
  button: {
    display: 'block',
    width: '100%',
    maxWidth: '300px',
    marginTop: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#D2C2A7',
    color: 'black',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0 auto', // Ensures the button is centered within the form
    fontFamily: 'Roboto, sans-serif',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: 'white',
    textAlign: 'center', // Centers the text within the title element
    fontFamily: 'Roboto, sans-serif',
  },
};

function RegisterPage({ register }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        console.log('Utilisateur inscrit.');
        alert("Vous êtes inscrit !");
      } else {
        console.error(`L'utilisateur n'est pas inscrit, une erreur est survenue.`);
      }

    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Inscription</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Nom d'utilisateur:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            Confirmer le mot de passe:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <button type="submit" style={styles.button}>S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

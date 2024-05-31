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
    width: '500px',
    margin: '0 auto', // Ensures the form container itself is centered horizontally
  },
  form: {
    backgroundColor: 'transparent',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    margin: '0 auto', // Ensures the form itself is centered horizontally within the container
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    color: 'white',
    fontSize: '16px',
    marginBottom: '10px',
  },
  input: {
    display: 'block',
    width: '50%',
    padding: '10px',
    margin: '10px auto', // Ensures the input fields are centered within the form
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#D2C2A7',
  },
  button: {
    display: 'block',
    width: '50%',
    marginTop: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#D2C2A7',
    color: 'black',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '0 auto', // Ensures the button is centered within the form
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: 'white',
    textAlign: 'center', // Centers the text within the title element
  },
};

function LoginPage({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem('token', userData.token);
        login(userData);
      } else {
        const errorMessage = await response.text();
        console.error(`Erreur lors de la connexion: ${errorMessage}`);
      }
    } catch(error) {
      console.error('Erreur lors de la connexion', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
import React, { useState } from 'react';

// CSS styles in JS
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(#5d625e, #A89D89)',
  },
  form: {
    backgroundColor: 'transparent',
    padding: '150px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#D2C2A7',
  },
  button: {
    display: 'block',
    width: '106%',
    marginTop: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#D2C2A7',
    color: 'black',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

function ProfilePage({ user, updatePassword }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    // Call the updatePassword function with current and new password
    updatePassword(currentPassword, newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Profil</h2>
        <p>Email: {user.email}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Mot de passe actuel:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <br />
          <label>
            Nouveau mot de passe:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <br />
          <label>
            Confirmer le nouveau mot de passe:
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              style={styles.input}
              required
            />
          </label>
          <br />
          <button type="submit" style={styles.button}>Changer le mot de passe</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
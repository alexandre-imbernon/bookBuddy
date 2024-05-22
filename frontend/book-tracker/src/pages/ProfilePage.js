import React, { useState } from 'react';

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
    <div>
      <h2>Profil</h2>
      <p>Email: {user.email}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Mot de passe actuel:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
            required
          />
        </label>
        <br />
        <button type="submit">Changer le mot de passe</button>
      </form>
    </div>
  );
}

export default ProfilePage;

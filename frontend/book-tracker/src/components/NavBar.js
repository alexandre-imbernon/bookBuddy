import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
  return (
    <nav style={{ backgroundColor: '#000', padding: '10px' }}>
    <h1 style={{ color: '#fff' }}>BookBuddy</h1>
      <Link style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }} to="/">Home</Link>
      <Link style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }} to="/add">Add Book</Link>
      <Link style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }} to="/favorites">Favorites</Link>
      <Link style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }} to="/rewards">Rewards</Link>
      {user ? (
        <>
          <Link style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }} to="/profile">Profile</Link>
          <button style={{ color: '#fff', backgroundColor: '#dc3545', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }} to="/login">Login</Link>
          <Link style={{ marginRight: '10px', color: '#fff', textDecoration: 'none' }} to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

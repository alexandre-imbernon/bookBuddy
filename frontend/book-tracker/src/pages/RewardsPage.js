import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(#5d625e, #A89D89)',
  },
  title: {
    margin: '20px 0',
    fontSize: '24px',
    color: 'white',
    textAlign: 'center',
  },
  message: {
    color: 'white',
  },
  rewardItem: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

function RewardsPage({ user }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Rewards</h2>
      <div>
        {/* Display user rewards - this is a placeholder */}
        {user.rewards && user.rewards.length > 0 ? (
          user.rewards.map((reward, index) => (
            <div key={index} style={styles.rewardItem}>
              <h3>{reward.name}</h3>
              <p>{reward.description}</p>
            </div>
          ))
        ) : (
          <p style={styles.message}>No rewards yet.</p>
        )}
      </div>
    </div>
  );
}

export default RewardsPage;
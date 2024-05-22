import React from 'react';

function RewardsPage({ user }) {
  return (
    <div>
      <h2>Rewards</h2>
      <div>
        {/* Display user rewards - this is a placeholder */}
        {user.rewards && user.rewards.length > 0 ? (
          user.rewards.map((reward, index) => (
            <div key={index}>
              <h3>{reward.name}</h3>
              <p>{reward.description}</p>
            </div>
          ))
        ) : (
          <p>No rewards yet.</p>
        )}
      </div>
    </div>
  );
}

export default RewardsPage;

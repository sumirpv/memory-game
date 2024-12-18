import React, { useState, useEffect } from 'react';

function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];
    setHighScores(scores);
  }, []);

  return (
    <div className="high-scores">
      <h3>High Scores</h3>
      <ul id="highScoresList">
        {highScores.map((score, index) => (
          <li key={index}>
            Moves: {score.moves} | Time: {score.time}s | {score.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HighScores;
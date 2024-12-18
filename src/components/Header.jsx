import React from 'react';

function Header({
  moves,
  matches,
  timeElapsed,
  hintsRemaining,
  onThemeToggle,
  onRestart
}) {
  return (
    <div className="game-header">
      <div className="stats">
        <span className="timer">Time: {timeElapsed}s</span>
        <span className="moves">Moves: {moves}</span>
        <span className="matches">Matches: {matches}</span>
        <span className="level">Level: 1</span>
      </div>
      <div className="controls">
        <select id="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="hint-btn">
          Hint ({hintsRemaining})
        </button>
        <button className="theme-btn" onClick={onThemeToggle}>
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

export default Header;
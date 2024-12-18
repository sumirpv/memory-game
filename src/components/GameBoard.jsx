import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';

const EMOJIS = ["🎮", "🎲", "🎯", "🎨", "🎭", "🎪", "🎫", "🎬"];

function GameBoard({
  moves,
  setMoves,
  matches,
  setMatches,
  timeElapsed,
  setTimeElapsed,
  onGameComplete,
  isGameComplete
}) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const initializeCards = useCallback(() => {
    const gameArray = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(gameArray);
  }, []);

  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  useEffect(() => {
    let timer;
    if (!isGameComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameComplete, setTimeElapsed]);

  useEffect(() => {
    if (matches === EMOJIS.length) {
      onGameComplete();
    }
  }, [matches, onGameComplete]);

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 2) return;
    if (matchedCards.includes(clickedCard.id)) return;
    if (flippedCards.includes(clickedCard.id)) return;

    setMoves(prev => prev + 1);
    setFlippedCards(prev => [...prev, clickedCard.id]);

    if (flippedCards.length === 1) {
      const firstCard = cards.find(card => card.id === flippedCards[0]);
      if (firstCard.emoji === clickedCard.emoji) {
        setMatchedCards(prev => [...prev, firstCard.id, clickedCard.id]);
        setMatches(prev => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="game-container">
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
}

export default GameBoard;
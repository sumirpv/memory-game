import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Paper,
  ThemeProvider,
  createTheme,
  IconButton
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './App.css';

const cardImages = [
  { src: "🐶", matched: false },
  { src: "🐱", matched: false },
  { src: "🐭", matched: false },
  { src: "🐹", matched: false },
  { src: "🐰", matched: false },
  { src: "🦊", matched: false },
];

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#1a237e',
      paper: '#283593',
    },
  },
});

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            background: 'linear-gradient(145deg, #283593 30%, #1a237e 90%)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Memory Game
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={shuffleCards}
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                }}
              >
                New Game
              </Button>
              <Button
                variant="contained"
                startIcon={<EmojiEventsIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
              >
                Turns: {turns}
              </Button>
            </Box>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            perspective: '1000px'
          }}>
            {cards.map(card => (
              <Card
                key={card.id}
                sx={{
                  position: 'relative',
                  aspectRatio: '1',
                  cursor: 'pointer',
                  transition: 'transform 0.6s',
                  transformStyle: 'preserve-3d',
                  transform: (choiceOne?.id === card.id || choiceTwo?.id === card.id || card.matched)
                    ? 'rotateY(180deg)'
                    : 'none',
                  bgcolor: card.matched ? 'success.dark' : 'primary.dark',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                }}
                onClick={() => !disabled && !card.matched && card !== choiceOne && handleChoice(card)}
              >
                <Box sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  background: 'linear-gradient(145deg, #3949ab 30%, #283593 90%)',
                  borderRadius: 1,
                }}>
                  ?
                </Box>
                <Box sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  background: 'white',
                  borderRadius: 1,
                }}>
                  {card.src}
                </Box>
              </Card>
            ))}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
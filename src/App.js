import './App.scss';
import { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

function App() {
  const [language, setLanguage] = useState('');
  const [slangOfTheDay, setSlangOfTheDay] = useState('');
  const [translation, setTranslation] = useState('');
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [dynamicMessage, setDynamicMessage] = useState('');
  const [generateCount, setGenerateCount] = useState(0); // Track number of additional generations
  const [buttonsDisabled, setButtonsDisabled] = useState(false); // Track if buttons are disabled

  const getSlang = async () => {
    try {
      const response = await fetch(
        `https://sj7d2fzcak.execute-api.us-east-1.amazonaws.com/slang?language=${language}`
      );
      const data = await response.json();
      setSlangOfTheDay(data.slang);
      setTranslation(data.translation);
      setIsCardVisible(true);
    } catch (error) {
      console.error('Error fetching slang:', error);
    }
  };

  const handleGenerateAgain = () => {
    getSlang();
    setGenerateCount((prevCount) => prevCount + 1); // Increment generate count
  };

  const closeModal = () => {
    setIsCardVisible(false);
    if (generateCount >= 4) {
      setButtonsDisabled(true); // Disable buttons after 2 additional generations
      setDynamicMessage('Oya, make we hear word. Abeg come back tomorrow!'); // Goodbye message
    } else {
      setDynamicMessage('Nawa o! You tink sey u don sabi, oya try again');
    }
  };

  return (
    <div className="App">
      {/* Add the logo here */}
      <div className="logo-container">
        <img src="/logo.png" alt="Street Slang Logo" className="logo" />
      </div>

      {!isCardVisible && (
        <div className="text-part">
          {!dynamicMessage && <h1>Which Confam Slang u wan learn today?</h1>}
          {dynamicMessage && <h1 className='yellow'>{dynamicMessage}</h1>}
          <div className='buttons'>
            <button
              onClick={() => {
                setLanguage('Mandarin');
                getSlang();
              }}
              className="button mandarin-button"
              disabled={buttonsDisabled} 
            >
              Mandarin
            </button>
            <button
              onClick={() => {
                setLanguage('Yoruba');
                getSlang();
              }}
              className="button yoruba-button"
              disabled={buttonsDisabled} 
            >
              Yoruba
            </button>
            <br />
            <button
              onClick={() => {
                setLanguage('Igbo');
                getSlang();
              }}
              className="button igbo-button"
              disabled={buttonsDisabled} 
            >
              Igbo
            </button>
          </div>
        </div>
      )}

      {isCardVisible && (
        <div className="slang-card">
          <Card sx={{ minWidth: 275 }} className={`card-wrapper ${!isCardVisible ? 'fade-out' : ''}`}>
            <CardContent className="card-content">
              <Typography variant="h4" className='card-header' gutterBottom sx={{ color: 'white' }}>
                Slang wey dey Trend:
              </Typography>
              <Typography variant="h4" component="div" className='slang-text'>
                {slangOfTheDay}
              </Typography>
              <Typography variant="h6" className='translation-text'>
                {translation}
              </Typography>
            </CardContent>
            <CardActions className="card-actions">
              {generateCount < 4 && ( 
                <Button
                  size="small"
                  className="generate-btn"
                  onClick={handleGenerateAgain}
                >
                  Oya Next!
                </Button>
              )}
              {generateCount >= 4 && ( // Show message after 2 additional generations
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Oga, you too like slang o! Oya come back tomorrow.
                </Typography>
              )}
              <br />
              <Button
                size="small"
                className="close-btn"
                onClick={closeModal}
              >
                Comot Abeg
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
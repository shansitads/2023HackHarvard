import React, { useState, useEffect } from 'react';

function ReactionTimeGame() {
  
  // Timer states
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Whackamole states
  const [showImage, setShowImage] = useState(false)
  const [waitingForStart, setWaitingForStart] = useState(false)
  const [waitingForImage, setWaitingForImage] = useState(false)
  const [displayTooSoon, setDisplayTooSoon] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  // Timer global variable
  let timer;

  // Some timer functionality 
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      setStartTime(Date.now() - elapsedTime);
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, elapsedTime, startTime]);  


  // When the game is running, the user has to wait a bit
  const handleStartGame = () => {
    // resetting the values
    setWaitingForStart(false);
    setWaitingForImage(true);
    setGameOver(false);

    // The timer runs for a designated time. When it runs out, the image is shown.
    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(handleShowImage, randomNumber);
  };

  // When the image changes, prompting the user to click to test reaction time
  const handleShowImage = () => { 
    setShowImage(true);
    setIsRunning(true);
  }

  // Handles when the game ends, where the user either clicked too early, or clicked after the image shows to display the reaction time
  const handleStopGame = () => {
    setIsRunning(false);
    setGameOver(true);
  };

  // Simply handles the reset of the timer
  const handleReset = () => {
    setGameOver(false);
    setIsRunning(false);
    setElapsedTime(0);
    setShowImage(false);
    setWaitingForStart(true);
    clearTimeout(timer);
  };

  // Formats the time into decimal seconds
  const formatTime = (time) => {
    const decimalSeconds = (time / 1000).toFixed(2);
    return decimalSeconds;
  };

  return (
    <div>

      <h1>Reaction Time Game</h1>
      <p>Click the stop button when the image appears:</p>

      <p>Time: {formatTime(elapsedTime)} seconds</p>
      <button onClick={handleStartGame} disabled={gameOver}>Start</button>
      <button onClick={handleStopGame}  disabled = {gameOver}>WHACK</button>
      <button onClick={handleReset}>Next</button>

      <div>
        { displayTooSoon && <p>you clicked too soon</p>}
      </div>
      <div>
      <div className="mole">
        { showImage && <img src='src/assets/whackamole.jpeg'></img>}
        </div>
      </div>
    </div>
  );
}

export default ReactionTimeGame;

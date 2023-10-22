import React, { useState, useEffect } from 'react';
import CountdownTimer from '../components/CountdownTimer';



function CodeMatchGame() { 

  const [gameOver, setGameOver] = useState(false);
  



  return (
    <>
      <CountdownTimer seconds={5}/>
    </>
  ); 
}

export default CodeMatchGame;
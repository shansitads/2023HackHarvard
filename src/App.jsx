import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginAndSignup from './pages/LoginAndSignup'
import SleepingScaleGame from './pages/SleepinessScaleGame'
import MoodTracker from './pages/MoodTracker'
import ImageDifferenceGame from './pages/ImageDifferenceGame'
import ImageIdentificationGame from './pages/ImageIdentificationGame'
import ReactionTimeGame from './pages/ReactionTimeGame'
import DownloadReport from './components/DownloadReport'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { data } from './backend/keys'

function App() {
  const dataRef = useRef(null)
  const [loggedIn, setLoggedIn] = useState(false);
  const [sleepy, setSleepy] = useState(false);
  const [mood, setMood] = useState(false);

  const toggleLogIn = () => {
    setLoggedIn(!loggedIn);
  }

  const toggleSleepy = () => {
    setSleepy(!sleepy);
  }

  const toggleMood = () => {
    setMood(!mood);
  }

  return (
    <div>
      {loggedIn === false ? (
        <LoginAndSignup dataRef={dataRef} toggleLogIn={toggleLogIn} />
      ) : (
        <>
          
          {mood === false ? (
            <MoodTracker dataRef={dataRef} toggleMood={toggleMood} />
          ) : sleepy === false ? (
            <SleepingScaleGame dataRef={dataRef} toggleSleepy={toggleSleepy} />
          ) : (
            <ImageDifferenceGame dataRef={dataRef} />
          )}
          <DownloadReport />
        </>
      )}
    </div>
  );
}

export default App

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

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const dataRef = useRef(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAndSignup dataRef={dataRef} />}>
          <Route path="moodtracker" element={<MoodTracker />} />
          <Route path="sleepingScale" element={<SleepingScaleGame />} />
          <Route path="whackamole" element={<ReactionTimeGame />} />
          <Route path="imageDifference" element={<ImageDifferenceGame />} />
          <Route path="newImageIdentify" element={<ImageIdentificationGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App

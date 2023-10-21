import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginAndSignup from './pages/LoginAndSignup.jsx'
import SleepingScaleGame from './pages/SleepinessScaleGame.jsx'

import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      {/* <LoginAndSignup /> */}
      <SleepingScaleGame />
    </BrowserRouter>
  );
}

export default App

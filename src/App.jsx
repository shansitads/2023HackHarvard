import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginAndSignup from './pages/LoginAndSignup.jsx'

import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <LoginAndSignup/>
    </BrowserRouter>
  );
}

export default App

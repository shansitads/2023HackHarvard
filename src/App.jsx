import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginAndSignup from './pages/LoginAndSignup.jsx'

import { BrowserRouter } from 'react-router-dom';

function App() {
  const dataRef = useRef(null)

  return (  
    <BrowserRouter>
      <LoginAndSignup dataRef={dataRef} />
    </BrowserRouter>
  );
}

export default App

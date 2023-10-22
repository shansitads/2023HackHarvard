import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginAndSignup from './pages/LoginAndSignup.jsx'
import SleepingScaleGame from './pages/SleepinessScaleGame.jsx'

import { BrowserRouter } from 'react-router-dom';


function App() {
  const [dataRef, setDataRef] = useState(null);

  useEffect(() => {
    console.log(dataRef);
  }, [dataRef])

  return (
    <BrowserRouter>
      <LoginAndSignup dataRef={dataRef} setDataRef={setDataRef} />
    </BrowserRouter>
  );
}

export default App

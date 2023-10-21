import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

import { BrowserRouter } from 'react-router-dom';


function App() {

  const [seen, setSeen] = useState(false);
  const [formType, setFormType] = useState("login");

  function togglePop () {
    setSeen(!seen);
  };

  function switchFormType(type) {
    setFormType(type);
  }
  

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <div className="popup">
            <button
              onClick={() => {
                togglePop();
                switchFormType("login");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                togglePop();
                switchFormType("signup");
              }}
            >
              Sign Up
            </button>
            {seen ? (
              formType === "login" ? (
                <LoginForm toggle={togglePop} />
              ) : (
                <SignUpForm toggle={togglePop} />
              )
            ) : null}
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App

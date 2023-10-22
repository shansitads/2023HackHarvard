import React, { useState, useEffect, useRef } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

function LoginAndSignup({ dataRef, toggleLogIn }) {
    const [seen, setSeen] = useState(false);
    const [formType, setFormType] = useState("login");

    function togglePop () {
        setSeen(!seen);
    };

    function switchFormType(type) {
        setFormType(type);
    }
    console.log("here")
    return (
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
                <LoginForm toggle={togglePop} dataRef={dataRef} toggleLogIn={toggleLogIn}/>
                ) : (
                <SignUpForm toggle={togglePop} dataRef={dataRef} toggleLogIn={toggleLogIn}/>
                )
            ) : null}
        </div>
    );
}

export default LoginAndSignup;

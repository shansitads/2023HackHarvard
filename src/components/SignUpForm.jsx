import React, { useState, useRef } from "react";
import '../App.css'

import firebaseConfig from "../backend/firebase.jsx";

function SignUpForm({ toggle }) {
  const [form, setForm] = useState({});
  const validPassword = useRef(null); 

  // //dummy state to rerender invalid password message
  const [rerender, setRerender] = useState(false);

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    if(form.password !== form.confirmPassword || form.password.length < 6) {
      validPassword.current = false;
      setRerender(prev => !prev);
      return;
    }

    validPassword.current = true;
    setRerender(prev => !prev);
    firebaseConfig.createUser(form.email, form.password, form.name, form.careTakerName, form.careTakerEmail);
    console.log(form);

    toggle();
  };

  return (
    
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <input name="name" onChange={updateForm} placeholder="Name" />
        <input
          name="email"
          onChange={updateForm}
          placeholder="Email"
          type="email"
        />
        <input
          name="password"
          onChange={updateForm}
          placeholder="Password"
          type="password"
        />
        <input
          name="confirmPassword"
          onChange={updateForm}
          placeholder="Confirm Password"
          type="password"
        />
        <input
          name="careTakerName"
          onChange={updateForm}
          placeholder="Caretaker Name"
          type="text"
        />
        <input
          name="careTakerEmail"
          onChange={updateForm}
          placeholder="Caretaker Email"
          type="email"
        />
        <div className = "grid-container">
          <button type="submit">Sign Up</button>
          <button onClick={toggle}>Login</button>
        </div>
      </form>
      <div>
        {validPassword.current === false && <h3 className = "validLogin-textBox">Passwords must match and be 6 characters</h3>}
      </div>
      
    </div>
  );
}

export default SignUpForm;

import React, { useState, useRef } from "react";
import '../App.css'
import { doc, setDoc } from 'firebase/firestore';
import firebaseConfig from "../backend/firebase.jsx";

function SignUpForm({ toggle, dataRef }) {
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

    const createUserPromise = firebaseConfig.createUser(
      form.email, 
      form.password, 
      form.name,
      form.careTakerName,
      form.careTakerEmail
    );

    await createUserPromise;
    
    console.log("please work");

    const timestamp = firebaseConfig.getTimestamp();

    const localDataRef = doc(firebaseConfig.db, "users", firebaseConfig.auth.currentUser.uid, "data", timestamp);
    
    dataRef.current = localDataRef;
    console.log(dataRef.current);

    await setDoc(dataRef.current, {
      timestamp: timestamp
    })

    toggle();
  };

  return (
    <div className="signupform">

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
          <button onClick={toggle}>Login</button>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div>
        {validPassword.current === false && <h3 className = "validLogin-textBox">Passwords must match and be 6 characters</h3>}
      </div>
      </div>
    </div>
  );
}

export default SignUpForm;

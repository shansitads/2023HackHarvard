import React, { useState, useRef, useEffect } from "react";
import firebaseConfig from "../backend/firebase.jsx";
import '../App.css';
import { signInWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import firebase from "../backend/firebase.jsx";

function LoginForm({ toggle, dataRef }) {
  const [form, setForm] = useState({});
  const validLogin = useRef(null);

  const [rerender, setRerender] = useState(false);

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  };

  var localDataRef;
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form.email + " " + form.password);
    
    signInWithEmailAndPassword(firebaseConfig.auth, form.email, form.password).then(async (cred)=> {
      console.log(cred.user.uid + " logged in");
      validLogin.current = true;
      setRerender(prev => !prev);

      const timestamp = firebaseConfig.getTimestamp();

      //make this as a function in app jsx, call it
      localDataRef = doc(firebaseConfig.db, "users", cred.user.uid, "data", timestamp);
      dataRef.current = localDataRef;

      await setDoc(dataRef.current, {
        timestamp: timestamp
      })

      toggle();
    })
    .catch((err)=> {
      console.log("failed to log in");
      validLogin.current = false;
      setRerender(prev => !prev);
    })  
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input name="email" onChange={updateForm} placeholder="Email" />
      <input
        name="password"
        onChange={updateForm}
        placeholder="Password"
        type="password"
      />
      <button type="submit">Log In</button>
     </form>
    
    {validLogin.current === false && <h4 className = "validLogin-textBox">Failed to login, please try again.</h4>}

    </div>
  );
}

export default LoginForm;

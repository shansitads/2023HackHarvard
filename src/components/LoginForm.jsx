import React, { useState, useRef } from "react";
import firebaseConfig from "../backend/firebase.jsx";
import '../App.css';
import { signInWithEmailAndPassword } from "@firebase/auth";

function LoginForm({ toggle }) {
  const [form, setForm] = useState({});
  const validLogin = useRef(null);

  const [rerender, setRerender] = useState(false);

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
    console.log(form);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form.email + " " + form.password);
    
    signInWithEmailAndPassword(firebaseConfig.auth, form.email, form.password).then((cred)=> {
      console.log(cred.user + " logged in");
      validLogin.current = true;
      setRerender(prev => !prev);
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

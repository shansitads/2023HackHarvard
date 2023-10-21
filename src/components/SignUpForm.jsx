import React, { useState } from "react";

function SignUpForm({ toggle }) {
  const [form, setForm] = useState({});

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    toggle();
  };

  // addEventListener(() =)

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={updateForm} placeholder="Username" />
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
          name="Caretaker Name"
          onChange={updateForm}
          placeholder="Caretaker Name"
          type="text"
        />
        <input
          name="Caretaker email"
          onChange={updateForm}
          placeholder="Caretaker Email"
          type="email"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;

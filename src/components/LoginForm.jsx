import React, { useState } from "react";

function LoginForm({ toggle }) {
  const [form, setForm] = useState({});

  const updateForm = (updates) => {
    const copy = { ...form };
    for (const [key, value] of Object.entries(updates)) {
      set(copy, key, value);
    }
    setForm(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    toggle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={updateForm} placeholder="Username" />
      <input
        name="password"
        onChange={updateForm}
        placeholder="Password"
        type="password"
      />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;

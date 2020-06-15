// TODO ADD TOAST FOR LOGIN

import React, { useState } from "react";

const Login = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          value={email}
          required
        ></input>
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          minLength="4"
          value={password}
          required
        ></input>
        <button type="submit">SUBMIT!</button>
      </form>
    </div>
  );
};

export default Login;

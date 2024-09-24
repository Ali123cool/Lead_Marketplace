// Src/Components/Login_Form.js

import React, { useState } from 'react';

const Login_Form = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, rememberMe });
  };

  return (
    <form className="bg-primary p-6 rounded-md max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Email</label>
        <input
          type="email"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Password</label>
        <input
          type="password"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label className="text-bodyText font-body">Remember Me</label>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-button1 text-bodyText py-3 rounded-md font-semibold"
        >
          Login
        </button>
      </div>

    </form>
  );
};

export default Login_Form;

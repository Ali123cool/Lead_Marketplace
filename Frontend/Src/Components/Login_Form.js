import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login_Form = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, rememberMe });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form className="bg-primary p-6 rounded-md max-w-md mx-auto" onSubmit={handleSubmit}>
      {/* Email Field */}
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

      {/* Password Field */}
      <div className="mb-4 relative">
        <label className="block text-bodyText font-body mb-2">Password</label>
        <div className="relative w-full">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="w-full p-3 border border-secondary rounded-md text-black pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-button1"
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
          </span>
        </div>
      </div>

      {/* Remember Me */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          className="mr-2"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label className="text-bodyText font-body">Remember Me</label>
      </div>

      {/* Submit Button */}
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

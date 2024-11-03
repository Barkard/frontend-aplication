import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      onLogin();
    } else {
      alert('Please enter a username and password.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-light" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Sign In</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;

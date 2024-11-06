import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import RegisterForm from './registerForm';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Authenticate any user
    if (username && password) {
      onLogin();
      navigate('/');
    } else {
      alert('Please enter both username and password');
    }
  };

  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ width: '300px' }}>
      <h2 className="text-center mb-4 fw-bold">Sign In</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-bold">Username</label>
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
          <label htmlFor="password" className="form-label fw-bold">Password</label>
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
        <Button variant="link" onClick={handleShowRegister} className="w-100 text-decoration-none">
          Register a new account
        </Button>
      </form>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm onClose={handleCloseRegister} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginForm;
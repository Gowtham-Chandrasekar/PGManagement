import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('tenant'); // default role
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let url = '';
      if (role === 'owner') {
        url = 'http://localhost:8080/api/owner/login';
      } else if (role === 'admin') {
        url = 'http://localhost:8080/api/admin/login';
      } else {
        url = 'http://localhost:8080/api/tenant/login';
      }

      const response = await axios.post(url, { id, password });

      if (response.data === 'Login Successful') {
        if (role === 'owner') navigate('/owner-dashboard');
        else if (role === 'admin') navigate('/admin-dashboard');
        else navigate('/tenant-dashboard');
      } else {
        setError('Invalid ID or Password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4">Login</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="tenant">Tenant</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;

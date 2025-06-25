import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const UpdateAdmin = () => {
  const [adminId, setAdminId] = useState('');
  const [admin, setAdmin] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch admin details when adminId is entered
  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/owner/get-admin/${adminId}`);
      setAdmin(response.data);
      setError('');
    } catch (err) {
      setAdmin(null);
      setError('Admin not found.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/owner/update-admin/${adminId}`, admin);
      setMessage('Admin updated successfully!');
      setError('');
    } catch (err) {
      setMessage('');
      setError('Failed to update admin.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Update Admin Details</h2>

      <Form onSubmit={(e) => { e.preventDefault(); fetchAdminDetails(); }}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Admin ID</Form.Label>
          <Form.Control
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="info" type="submit">Fetch Admin</Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {admin && (
        <Form className="mt-4" onSubmit={handleUpdate}>
          {message && <Alert variant="success">{message}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={admin.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={admin.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" name="contact" value={admin.contact} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" value={admin.password} onChange={handleChange} required />
          </Form.Group>

          <Button variant="primary" type="submit">Update Admin</Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdateAdmin;

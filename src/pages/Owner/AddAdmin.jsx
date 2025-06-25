import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    contact: '',
    adminId: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/owner/add-admin', admin);
      setMessage('Admin added successfully!');
      setError('');
      setAdmin({
        name: '',
        email: '',
        contact: '',
        adminId: '',
        password: '',
      });
    } catch (err) {
      setMessage('');
      setError('Failed to add admin. Please check the inputs or backend.');
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Add New Admin</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
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
          <Form.Label>Admin ID</Form.Label>
          <Form.Control type="text" name="adminId" value={admin.adminId} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={admin.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">Add Admin</Button>
      </Form>
    </Container>
  );
};

export default AddAdmin;

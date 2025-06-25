import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddTenant = () => {
  const [tenant, setTenant] = useState({
    tenantId: '',
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTenant({ ...tenant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/admin/add-tenant', tenant);
      setMessage('Tenant added successfully!');
      setError('');
      setTenant({
        tenantId: '',
        name: '',
        email: '',
        phone: '',
        password: ''
      });
    } catch (err) {
      setMessage('');
      setError('Failed to add tenant. Please check your input or backend connection.');
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Add New Tenant</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tenant ID</Form.Label>
          <Form.Control type="text" name="tenantId" value={tenant.tenantId} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={tenant.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={tenant.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="phone" value={tenant.phone} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={tenant.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">Add Tenant</Button>
      </Form>
    </Container>
  );
};

export default AddTenant;

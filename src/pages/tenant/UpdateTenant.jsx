import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const UpdateTenant = () => {
  const [tenantId, setTenantId] = useState('');
  const [tenant, setTenant] = useState({
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

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/tenant/${tenantId}`);
      setTenant(response.data);
      setMessage('');
      setError('');
    } catch (err) {
      setError('Tenant not found.');
      setTenant({ name: '', email: '', phone: '', password: '' });
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/admin/update-tenant/${tenantId}`, tenant);
      setMessage('Tenant updated successfully.');
      setError('');
    } catch (err) {
      setError('Failed to update tenant.');
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Update Tenant</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Tenant ID</Form.Label>
          <Form.Control
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            placeholder="Enter Tenant ID"
            required
          />
        </Form.Group>
        <Button variant="secondary" onClick={handleFetch} className="mb-3">
          Fetch Tenant
        </Button>

        {tenant.name && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={tenant.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={tenant.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={tenant.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={tenant.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              Update Tenant
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default UpdateTenant;

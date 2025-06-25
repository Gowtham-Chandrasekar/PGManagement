import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const DeleteTenant = () => {
  const [tenantId, setTenantId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/delete-tenant/${tenantId}`);
      setMessage(`Tenant with ID "${tenantId}" deleted successfully.`);
      setError('');
      setTenantId('');
    } catch (err) {
      console.error(err);
      setError('Failed to delete tenant. Make sure the ID is correct.');
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Delete Tenant</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Tenant ID</Form.Label>
          <Form.Control
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            placeholder="Enter Tenant ID to Delete"
            required
          />
        </Form.Group>
        <Button variant="danger" onClick={handleDelete}>
          Delete Tenant
        </Button>
      </Form>
    </Container>
  );
};

export default DeleteTenant;

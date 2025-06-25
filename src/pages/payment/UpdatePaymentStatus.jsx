import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const UpdatePaymentStatus = () => {
  const [tenantId, setTenantId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/admin/update-payment/${tenantId}`, {
        paymentStatus: status
      });
      setMessage(`Payment status for Tenant ID "${tenantId}" updated to "${status}".`);
      setError('');
      setTenantId('');
      setStatus('');
    } catch (err) {
      console.error(err);
      setError('Failed to update payment status.');
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Update Payment Status</h2>

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

        <Form.Group className="mb-3">
          <Form.Label>Payment Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">-- Select Status --</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update Payment
        </Button>
      </Form>
    </Container>
  );
};

export default UpdatePaymentStatus;

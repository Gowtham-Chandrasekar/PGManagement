import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const DeleteAdmin = () => {
  const [adminId, setAdminId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:8080/api/owner/delete-admin/${adminId}`);
      setMessage(`Admin with ID ${adminId} deleted successfully.`);
      setError('');
      setAdminId('');
    } catch (err) {
      setMessage('');
      setError('Failed to delete admin. Please make sure the ID is correct.');
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Delete Admin</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleDelete}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Admin ID to Delete</Form.Label>
          <Form.Control
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="danger" type="submit">Delete Admin</Button>
      </Form>
    </Container>
  );
};

export default DeleteAdmin;

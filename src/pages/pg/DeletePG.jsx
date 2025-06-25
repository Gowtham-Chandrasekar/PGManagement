import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const DeletePG = () => {
  const [pgId, setPgId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/owner/delete-pg/${pgId}`);
      setMessage(`PG with ID ${pgId} deleted successfully.`);
      setError('');
      setPgId('');
    } catch (err) {
      console.error(err);
      setError('Failed to delete PG. Make sure the ID is correct.');
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Delete PG</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>PG ID</Form.Label>
          <Form.Control
            type="text"
            value={pgId}
            onChange={(e) => setPgId(e.target.value)}
            placeholder="Enter PG ID to delete"
            required
          />
        </Form.Group>
        <Button variant="danger" onClick={handleDelete}>
          Delete PG
        </Button>
      </Form>
    </Container>
  );
};

export default DeletePG;

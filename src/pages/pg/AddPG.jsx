import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AddPG = () => {
  const [pg, setPg] = useState({
    name: '',
    location: '',
    sharingType: '',
    fees: '',
    status: 'Available'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setPg({ ...pg, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/owner/add-pg', pg);
      setMessage('PG added successfully!');
      setError('');
      setPg({
        name: '',
        location: '',
        sharingType: '',
        fees: '',
        status: 'Available'
      });
    } catch (err) {
      console.error(err);
      setError('Failed to add PG. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Add PG Details</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>PG Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={pg.name}
            onChange={handleChange}
            placeholder="Enter PG name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={pg.location}
            onChange={handleChange}
            placeholder="Enter PG location"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sharing Type</Form.Label>
          <Form.Select
            name="sharingType"
            value={pg.sharingType}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Sharing --</option>
            <option value="1">1 Sharing</option>
            <option value="2">2 Sharing</option>
            <option value="3">3 Sharing</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fees (INR)</Form.Label>
          <Form.Control
            type="number"
            name="fees"
            value={pg.fees}
            onChange={handleChange}
            placeholder="Enter monthly fee"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={pg.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          Add PG
        </Button>
      </Form>
    </Container>
  );
};

export default AddPG;

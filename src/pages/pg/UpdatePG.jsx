import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const UpdatePG = () => {
  const [pgId, setPgId] = useState('');
  const [pgDetails, setPgDetails] = useState({
    name: '',
    location: '',
    sharingType: '',
    fees: '',
    status: 'Available'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchPGDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/owner/get-pg/${pgId}`);
      setPgDetails(res.data);
      setError('');
    } catch (err) {
      setError('PG not found with the given ID.');
      setPgDetails({
        name: '',
        location: '',
        sharingType: '',
        fees: '',
        status: 'Available'
      });
    }
  };

  const handleChange = (e) => {
    setPgDetails({ ...pgDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/owner/update-pg/${pgId}`, pgDetails);
      setMessage('PG details updated successfully!');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to update PG details.');
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Update PG Details</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Enter PG ID</Form.Label>
          <Form.Control
            type="text"
            value={pgId}
            onChange={(e) => setPgId(e.target.value)}
            placeholder="Enter PG ID to Fetch"
          />
        </Form.Group>
        <Button variant="secondary" onClick={fetchPGDetails}>
          Fetch PG
        </Button>
      </Form>

      {pgDetails.name && (
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>PG Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={pgDetails.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={pgDetails.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sharing Type</Form.Label>
            <Form.Select
              name="sharingType"
              value={pgDetails.sharingType}
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
            <Form.Label>Fees</Form.Label>
            <Form.Control
              type="number"
              name="fees"
              value={pgDetails.fees}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={pgDetails.status}
              onChange={handleChange}
              required
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update PG
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdatePG;

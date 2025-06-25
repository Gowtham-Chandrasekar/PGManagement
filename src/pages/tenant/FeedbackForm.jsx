import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setError('');

    try {
      await axios.post('http://localhost:8080/api/tenant/feedback', feedback);
      setSuccessMsg('Feedback submitted successfully!');
      setFeedback({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Submit Feedback</h2>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="message" className="mb-3">
          <Form.Label>Your Feedback / Complaint</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={feedback.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit Feedback
        </Button>
      </Form>
    </Container>
  );
};

export default FeedbackForm;

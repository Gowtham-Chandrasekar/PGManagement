import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:8080/api/tenant/feedback', feedback);
      if (response.status === 200) {
        setSuccessMsg('Feedback submitted successfully!');
        setFeedback({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setErrorMsg('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Submit Feedback</h2>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows={4}
            value={feedback.message}
            onChange={handleChange}
            required
            placeholder="Write your feedback or complaint"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Feedback
        </Button>
      </Form>
    </Container>
  );
};

export default Feedback;

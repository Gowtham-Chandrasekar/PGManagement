import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const ViewFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/owner/feedback');
        setFeedbackList(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch feedback.');
      }
    };

    fetchFeedback();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Tenant Feedback & Complaints</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tenant Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((fb) => (
            <tr key={fb.id}>
              <td>{fb.id}</td>
              <td>{fb.name}</td>
              <td>{fb.email}</td>
              <td>{fb.message}</td>
              <td>{new Date(fb.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewFeedback;

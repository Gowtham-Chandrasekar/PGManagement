import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const ListPGs = () => {
  const [pgs, setPgs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/pg/all');
        setPgs(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch PGs.');
      }
    };

    fetchPGs();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">List of All PGs</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>PG Name</th>
            <th>Location</th>
            <th>Sharing</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {pgs.map((pg) => (
            <tr key={pg.id}>
              <td>{pg.id}</td>
              <td>{pg.name}</td>
              <td>{pg.location}</td>
              <td>{pg.sharingType}</td>
              <td>₹{pg.fees}</td>
              <td>{pg.status}</td>
              <td>{pg.contact}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListPGs;

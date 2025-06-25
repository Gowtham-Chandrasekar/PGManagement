import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';

const SearchPG = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pgs, setPgs] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search term.');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/api/pg/search?query=${searchQuery}`);
      setPgs(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to search PGs.');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Search Paying Guest (PG)</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form className="d-flex mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name, location or fees"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} className="ms-2">
          Search
        </Button>
      </Form>

      {pgs.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
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
      )}
    </Container>
  );
};

export default SearchPG;

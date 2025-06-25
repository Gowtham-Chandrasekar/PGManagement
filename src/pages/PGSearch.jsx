import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';

const PGSearch = () => {
  const [pgs, setPgs] = useState([]);
  const [search, setSearch] = useState('');

  const fetchPGs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pgs');
      setPgs(response.data);
    } catch (err) {
      console.error('Error fetching PGs:', err);
    }
  };

  useEffect(() => {
    fetchPGs();
  }, []);

  const filteredPGs = pgs.filter((pg) =>
    pg.name.toLowerCase().includes(search.toLowerCase()) ||
    pg.location.toLowerCase().includes(search.toLowerCase()) ||
    pg.fees.toString().includes(search)
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Search PGs</h2>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name, location or fee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Row>
        {filteredPGs.length > 0 ? (
          filteredPGs.map((pg) => (
            <Col md={4} className="mb-4" key={pg.id}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{pg.name}</Card.Title>
                  <Card.Text>
                    <strong>Location:</strong> {pg.location}<br />
                    <strong>Fees:</strong> ₹{pg.fees}<br />
                    <strong>Status:</strong>{' '}
                    <span className={pg.status === 'available' ? 'text-success' : 'text-danger'}>
                      {pg.status}
                    </span>
                    <br />
                    <strong>Contact:</strong> {pg.contact}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No PGs found.</p>
        )}
      </Row>
    </Container>
  );
};

export default PGSearch;

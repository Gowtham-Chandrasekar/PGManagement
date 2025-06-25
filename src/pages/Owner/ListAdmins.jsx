import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const ListAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/owner/all-admins');
      setAdmins(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch admins.');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">List of Admins</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {admins.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Admin ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.adminId}>
                <td>{index + 1}</td>
                <td>{admin.adminId}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No admins available.</p>
      )}
    </Container>
  );
};

export default ListAdmins;

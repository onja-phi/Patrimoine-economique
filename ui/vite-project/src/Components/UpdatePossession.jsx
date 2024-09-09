import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePossession() {
  const { libelle } = useParams();
  const [possession, setPossession] = useState({ libelle: '' });
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchPossession();
  }, []);

  const fetchPossession = async () => {
    try {
      const response = await fetch(`http://localhost:5001/possession/${libelle}`);
      const data = await response.json();
      setPossession({ libelle: data.libelle });
    } catch (error) {
      console.error('Erreur lors de la récupération de la possession:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5001/possession/${libelle}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newLibelle: possession.libelle }),
      });
      if (response.ok) {
        navigate('/possession');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la possession:', error);
    }
  };

  return (
    <Container>
      <h3>Mettre à jour le libellé de la possession</h3>
      <Form>
        {}
        <Form.Group controlId="formLibelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            value={possession.libelle}
            onChange={(e) => setPossession({ ...possession, libelle: e.target.value })}
          />
        </Form.Group>
        {}
        <Button variant="primary" onClick={handleUpdate}>Mettre à jour</Button>
      </Form>
    </Container>
  );
}

export default UpdatePossession;

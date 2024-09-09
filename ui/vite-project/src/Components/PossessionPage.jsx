import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PossessionPage() {
  const [possessions, setPossessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPossessions();
  }, []);

  const fetchPossessions = async () => {
    try {
      const response = await fetch('http://localhost:5001/possession');
      const data = await response.json();
      setPossessions(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des possessions:', error);
    }
  };

  const closePossession = async (libelle) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const response = await fetch(`http://localhost:5001/possession/${libelle}/close`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateFin: today }),
      });
      if (response.ok) {
        fetchPossessions();
      }
    } catch (error) {
      console.error('Erreur lors de la clôture de la possession:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Liste des Possessions</h3>
      <Button variant="primary" onClick={() => navigate('/possession/create')}>Créer une nouvelle possession</Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((p) => (
            <tr key={p.libelle}>
              <td>{p.libelle}</td>
              <td>{p.valeur}</td>
              <td>{new Date(p.dateDebut).toLocaleDateString()}</td>
              <td>{p.dateFin ? new Date(p.dateFin).toLocaleDateString() : 'Non clôturé'}</td>
              <td>{p.taux}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/possession/${p.libelle}/update`)}>Éditer</Button>
                <Button variant="danger" onClick={() => closePossession(p.libelle)}>Clôturer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PossessionPage;

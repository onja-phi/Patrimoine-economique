import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ClosePossession() {
  const { libelle } = useParams();
  const navigate = useNavigate();

  const handleClose = async () => {
    const today = new Date().toISOString(); // Obtient la date actuelle sous forme de chaîne ISO

    try {
      // Envoie une requête PUT avec la nouvelle date de clôture
      await fetch(`http://localhost:5001/possession/${libelle}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateFin: today }), // Envoie la date de clôture au serveur
      });
      navigate('/possessions');
    } catch (error) {
      console.error('Erreur lors de la clôture de la possession:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Clôturer la possession</h3>
      <p>Voulez-vous vraiment clôturer la possession {libelle}?</p>
      <Button variant="danger" onClick={handleClose}>Clôturer</Button>
      <Button variant="secondary" onClick={() => navigate('/possessions')}>Annuler</Button>
    </div>
  );
}

export default ClosePossession;

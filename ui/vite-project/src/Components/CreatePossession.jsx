import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { button } from 'react-bootstrap';

function CreatePossessionPage() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/possession', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ libelle, valeur, dateDebut, taux }),
            });
            const createdPossession = await response.json();
            console.log('Nouvelle possession créée:', createdPossession);
            
            window.location.href = '/possession';
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container mt-5">
          <h2 className="mb-3 text-center">Créer une possession</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="libelle" className="form-label">Libellé :</label>
              <input
                type="text"
                className="form-control"
                id="libelle"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="valeur" className="form-label">Valeur :</label>
              <input
                type="number"
                className="form-control"
                id="valeur"
                value={valeur}
                onChange={(e) => setValeur(Number(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateDebut" className="form-label">Date début :</label>
              <input
                type="date"
                className="form-control"
                id="dateDebut"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taux" className="form-label">Taux :</label>
              <input
                type="number"
                className="form-control"
                id="taux"
                value={taux}
                onChange={(e) => setTaux(Number(e.target.value))}
                step="0.01"
                min="0"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Créer</button>
          </form>
        </div>
      );
}

export default CreatePossessionPage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdatePossession() {
  const params = useParams();
  const [possesion, setPossesion] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await fetch('http://localhost:5001/possession/:libelle');
        const data = await response.json();
        setPossesion(data);        
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPossession();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/possession/${params.libelle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ libelle: possesion.libelle, dateFin: possesion.dateFin }),
      });
      const updatedPossession = await response.json();
      console.log('Possession mise à jour:', updatedPossession);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <h2>Edit Possession</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="libelle">Libelle:</label>
        <input
          type="text"
          id="libelle"
          value={possesion.libelle}
          readOnly
        />
        <br />
        <label htmlFor="dateFin">Date Fin:</label>
        <input
          type="date"
          id="dateFin"
          value={possesion.dateFin || ''}
          onChange={(e) => setPossesion(prev => ({...prev, dateFin: e.target.value}))}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdatePossession;
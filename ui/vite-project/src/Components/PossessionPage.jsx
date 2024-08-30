import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Possession from '../../../../models/possessions/Possession';

function PossessionPage() {
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await fetch('http://localhost:5001/possession');
        const data = await response.json();
        setPossessions(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPossessions();
  }, []);



  const handleClose = async () => {
    try {
      const response = await fetch(`/possession/${params.libelle}/close`, {
        method: 'PATCH',
      });
      const closedPossession = await response.json();
      setPossessions(
        possessions.map(p => p._id === params.libelle ? closedPossession : p)
      );
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-center text-primary">Liste des Possessions</h2>
      
      <div className="row">
        <div className="col-md-12 mx-auto text-center mb-3">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col" className="text-success">Libellé</th>
                <th scope="col">Valeur</th>
                <th scope="col">Date Début</th>
                <th scope="col">Taux</th>
              </tr>
            </thead>
            <tbody>
              {possessions.map(possession => (
                <tr key={possession._id}>
                  <td>{possession.libelle}</td>
                  <td>{possession.valeur}</td>
                  <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(possession.dateFin || '0001-01-01').toLocaleDateString()}</td>
                  <td>{possession.taux}</td>
                  <td>{(new Possession()).getValeurApresAmortissement(possession.valeur, possession.taux || 0, new Date(possession.dateDebut), new Date())}</td>
                  <td>
                    <Link to={`/possession/${possession._id}/edit`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleClose(possession._id)}>Close</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      <div className="d-flex justify-content-end mb-3">
        <Link to="/possession/create" className="btn btn-primary me-2">Créer une nouvelle possession</Link>
      </div>
    </div>
  );
  
}

export default PossessionPage;
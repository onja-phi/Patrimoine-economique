import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Possession from '../../../models/possessions/Possession.js';
import Personne from '../../../models/Personne.js';
import Flux from '../../../models/possessions/Flux.js';
import Patrimoine from '../../../models/Patrimoine.js';

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patrimoineValue, setPatrimoineValue] = useState(0);

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const possessions = data[0].data.possession;
        setJsonData(possessions);
      })
      .catch(error => console.error("Erreur lors de la récupération des données:", error));
  }, []);
  let personne = new Personne("John");
  let patrimoine = new Patrimoine(personne, []);

  const headers = ["Libellé", "Valeur Initiale", "Date Début", "Date Fin", "Amortissement", "Valeur Actuelle","Valeur constante"];

  return (
    <>
      <h3>PATRIMOINE ECONOMIQUE</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {jsonData.map((p, index) => {
            let possession;
            if (p.valeurConstante) {
              possession = new Flux(personne, p.libelle, p.valeurConstante, new Date(p.dateDebut), new Date(p.dateFin), p.amortissement, p.jour);
            }
            else {
              possession = new Possession(personne, p.libelle, p.valeurInitiale, new Date(p.dateDebut), new Date(p.dateFin), p.amortissement);
            }
            patrimoine.addPossession(possession);
            return (
              <tr key={index}>
                <td>{possession.libelle}</td>
                <td>{possession.valeur}</td>
                <td>{(possession.dateDebut).toLocaleDateString()}</td>
                <td>{(possession.dateFin).toLocaleDateString()}</td>
                <td>{possession.tauxAmortissement != null ? `${possession.tauxAmortissement}%` : 0}</td>
                <td>{possession.getValeur(new Date())}</td>
                <td>{possession.valeurConstante}</td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
      <div>
        <label htmlFor="date-picker">Sélectionnez une date : </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <button onClick={() => setPatrimoineValue((selectedDate))}>Valider</button>
        <div>Votre patrimoine à la date sélectionnée : {patrimoine.getValeur(selectedDate)} </div>
      </div>
    </>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Possession from '../../../../models/possessions/Possession.js';
import Flux from '../../../../models/possessions/Flux.js';
import Patrimoine from '../../../../models/Patrimoine.js';
import Personne from '../../../../models/Personne.js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function PatrimoinePage() {
  const [jsonData, setJsonData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Pour le calcul à une date spécifique
  const [startDate, setStartDate] = useState(new Date()); // Pour le calcul entre deux dates
  const [endDate, setEndDate] = useState(new Date()); // Pour le calcul entre deux dates
  const [patrimoineValue, setPatrimoineValue] = useState(0); // Résultat pour une date spécifique
  const [chartData, setChartData] = useState({ labels: [], datasets: [] }); // Données pour le graphique

  const personne = new Personne("John Doe");
  const patrimoine = new Patrimoine(personne, []);

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const possessions = data[1].data.possessions;
        setJsonData(possessions);
      })
      .catch(error => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  useEffect(() => {
    patrimoine.possessions = [];
    jsonData.forEach(p => {
      let possession;
      if (p.valeurConstante !== undefined) {
        possession = new Flux(
          personne,
          p.libelle,
          p.valeurConstante,
          new Date(p.dateDebut),
          p.dateFin ? new Date(p.dateFin) : null,
          p.tauxAmortissement || 0,
          p.jour || 1
        );
      } else {
        possession = new Possession(
          personne,
          p.libelle,
          p.valeur,
          new Date(p.dateDebut),
          p.dateFin ? new Date(p.dateFin) : null,
          p.tauxAmortissement || 0
        );
      }
      patrimoine.addPossession(possession);
    });
  }, [jsonData]);

  const handleValidation = () => {
    const value = patrimoine.getValeur(selectedDate);
    console.log(`Valeur du patrimoine à la date ${selectedDate.toISOString().split('T')[0]}: ${value}`);
    setPatrimoineValue(value);
  };

  const handleIntervalValidation = () => {
    const labels = generateDateRangeLabels(startDate, endDate); // Génère les labels pour les dates entre startDate et endDate
    const values = labels.map(label => {
      const date = new Date(label);
      const totalValue = patrimoine.getValeur(date); // Calcule la valeur totale pour chaque date
      console.log(`Valeur totale du patrimoine à la date ${label}: ${totalValue}`); // Debug log
      return totalValue;
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Évolution du Patrimoine',
          data: values,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  };

  const generateDateRangeLabels = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().split('T')[0]); // Format 'YYYY-MM-DD'
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  };

  return (
    <div className="container mt-5">
      <h3>PATRIMOINE ECONOMIQUE</h3>
      
      <div className="mb-4">
        <h4>Calculer la valeur à une date spécifique</h4>
        <div>
          <label htmlFor="date-picker">Sélectionnez une date : </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <button onClick={handleValidation} className="btn btn-primary ms-3">Valider</button>
        </div>
        <div className="mt-3">Valeur de votre patrimoine à la date sélectionnée : {patrimoineValue}</div>
      </div>

      {}
      <div className="mb-4">
        <h4>Évolution du Patrimoine entre Deux Dates</h4>
        <div className="d-flex mb-3">
          <div>
            <label htmlFor="start-date-picker">Sélectionnez la date de début : </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </div>
          <div className="ms-3">
            <label htmlFor="end-date-picker">Sélectionnez la date de fin : </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </div>
        </div>
        <button onClick={handleIntervalValidation} className="btn btn-primary">Afficher l'évolution</button>
        <div className="mt-4">
          {chartData.datasets.length > 0 ? (
            <Line data={chartData} options={{
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    font: {
                      size: 10
                    }
                  }
                }
              }
            }} />
          ) : "Chargement..."}
        </div>
      </div>
    </div>
  );
}

export default PatrimoinePage;
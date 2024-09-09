import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import PatrimoinePage from './Components/PatrimoinePage.jsx';
import PossessionPage from './Components/PossessionPage.jsx';
import CreatePossession from './Components/CreatePossession.jsx';
import UpdatePossession from './Components/UpdatePossession.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/patrimoine" element={<PatrimoinePage />} />
          <Route path="/possession" element={<PossessionPage />} />
          <Route path="/" element={< possessions/>} />
          <Route path="/possession/create" element={<CreatePossession />} />
          <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
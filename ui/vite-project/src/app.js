/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PatrimoinePage from './pages/PatrimoinePage';
import PossessionPage from './pages/PossessionPage';
import CreatePossessionPage from './pages/CreatePossessionPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/patrimoine" element={<PatrimoinePage />} />
        <Route path="/possession" element={<PossessionPage />} />
        <Route path="/possession/create" element={<CreatePossessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;*/

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PossessionPage from './PossessionPage';
import CreatePossession from './CreatePossession';
import UpdatePossession from './UpdatePossession';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/possession" element={<PossessionPage />} />
        <Route path="/possession/create" element={<CreatePossession />} />
        <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
      </Routes>
    </Router>
  );
}

export default App;


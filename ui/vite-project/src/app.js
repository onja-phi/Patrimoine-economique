import React from 'react';
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
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
}

export default App;

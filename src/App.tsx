import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import FeeChart from './pages/FeeChart';
import TxVersionChart from './pages/TxVersionChart';

function App() {

  return (
    <Routes>
      <Route path="/txversionchart" element={<TxVersionChart />} />
      <Route path="/" element={<FeeChart />} />
    </Routes>
  );
}

export default App;

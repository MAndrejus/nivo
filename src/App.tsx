import React from 'react';
import './App.css';
import { AssetsPieChart } from './components/graphs/pie';
import { Box } from './components/box';

const AssetsPieData = [
  { name: 'US Stock', value: 0.665 },
  { name: 'Non US Stock', value: 0.327 },
  { name: 'US Bond', value: 0 },
  { name: 'Non US Bond', value: 0 },
  { name: 'Cash', value: 0.005 },
  { name: 'Convertible', value: 0 },
  { name: 'Preferred', value: 0 },
  { name: 'Other', value: 0.003 },
];

function App() {
  return (
    <div className="App">
      <Box>
        <AssetsPieChart data={AssetsPieData} />
      </Box>
    </div>
  );
}

export default App;

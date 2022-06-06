import React from 'react';
import './App.css';
import { AssetsPieChart } from './components/graphs/pie';
import { Box } from './components/box';

const AssetsPieData = [
  { name: 'Europe', value: 100 },
  { name: 'America', value: 250 },
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

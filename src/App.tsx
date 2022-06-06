import React from 'react';
import './App.css';
import { AssetsPieChart } from './components/graphs/pie';
import { Box } from './components/box';
import { HistoricalReturnsBarChart } from './components/graphs/bar';

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

const HistoricalReturnsBarData = [
  { date: '2010', value: 10 },
  { date: '2011', value: 15 },
  { date: '2012', value: 22 },
  { date: '2013', value: -5 },
  { date: '2014', value: -15 },
  { date: '2015', value: 12 },
];

function App() {
  return (
    <div className="App">
      <Box>
        <AssetsPieChart data={AssetsPieData} />
      </Box>
      <Box>
        <HistoricalReturnsBarChart data={HistoricalReturnsBarData} />
      </Box>
    </div>
  );
}

export default App;

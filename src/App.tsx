import React from 'react';
import './App.css';
import { AssetsPieChart } from './components/graphs/pie';
import { Box } from './components/box';
import { HistoricalReturnsBarChart } from './components/graphs/bar';
import { LineGraph } from './components/graphs/linear';
import {
  compareAdvisorDrawdownData,
  compareAdvisorGrowthData,
  graphData,
  projectionData,
} from './components/graphs/linear/mocked-data';
import { ScatterPlotGraph } from './components/graphs/scatterplot';
import { riskReturnsData } from './components/graphs/scatterplot/mocks';
import { ScatterPlotGraphFeature } from './feature';
import { ColorPalettes } from './components/color-palettes';
import { ColorGuide } from './components/color-guide/ColorGuide';
import { TypographyGuideline } from './components/typography/TypographyGuideline';
import { typographyForDesktop, typographyForMobile } from './components/typography/mocks';

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
      <TypographyGuideline
        typographiesUsage={typographyForDesktop}
        title={'Desktop Typography Usage'}
      />
      <TypographyGuideline
        typographiesUsage={typographyForMobile}
        title={'Mobile Typography Usage'}
        type={'mobile'}
      />
      <ColorGuide />
      <ColorPalettes />
      <Box>
        <ScatterPlotGraphFeature />
      </Box>
      <Box>
        <ScatterPlotGraph data={riskReturnsData} />
      </Box>
      <Box>
        <LineGraph
          data={compareAdvisorGrowthData}
          min={0}
          tooltip={{ withColors: true }}
          legendsProps={{ itemsSpacing: 140 }}
        />
      </Box>
      <Box>
        <LineGraph
          data={compareAdvisorDrawdownData}
          tooltip={{ withColors: true, unitsPosition: 'end', valueDecimals: 1 }}
          legendsProps={{ itemsSpacing: 140 }}
          max={0}
          ticks={3}
          units={'%'}
        />
      </Box>
      <Box>
        <LineGraph
          data={graphData}
          investmentTarget={30000}
          projectionData={projectionData}
          withProjectionBreakpoint
        />
      </Box>
      <Box>
        <LineGraph data={graphData} investmentTarget={30000} />
      </Box>
      <Box>
        <LineGraph data={graphData} />
      </Box>
      <Box>
        <HistoricalReturnsBarChart data={HistoricalReturnsBarData} />
      </Box>
      <Box>
        <AssetsPieChart data={AssetsPieData} />
      </Box>
    </div>
  );
}

export default App;

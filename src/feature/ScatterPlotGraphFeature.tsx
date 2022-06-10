import React, { useState } from 'react';
import { DotData, ScatterPlotGraph } from '../components/graphs/scatterplot';
import { ScatterPlotGraphLegend } from '../components/graphs/scatterplot/legends/ScatterPlotGraphLegend';
import { selectGraphData, selectGraphMaxValues, selectLegendData } from './selectors';
import {
  scaleMaxValueMultiplier,
  scaleMinValueMultiplier,
} from '../components/graphs/scatterplot/utils';
import { ScatterPlotNodeData } from '@nivo/scatterplot/dist/types/types';

export const ScatterPlotGraphFeature = () => {
  const [state, setState] = useState({
    multiAssetFilterChecked: true,
    esgFilterChecked: true,
    quantitativeFilterChecked: true,
    dspFilterChecked: true,
    dspTaxSensitiveFilterChecked: true,
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string | number | null>(null);

  const multiAssetColors = [
    '#022e3c',
    '#02384a',
    '#024258',
    '#014b66',
    '#015574',
    '#015f82',
    '#01698f',
    '#01739d',
    '#007cab',
    '#0086b9',
    '#0090c7',
  ];

  const quantitativeColors = ['#1f7100', '#4d9300', '#63a70b', '#7abb1a', '#8acb22', '#9cd34c'];
  const esgColors = ['#208267', '#238F73', '#37A086', '#55B19A', '#83C7B6'];
  const dspColors = ['#A27D23', '#A8872A', '#AE9132', '#BFA85B', '#D0BE85'];
  const dspTaxSensitiveColors = ['#565A5C', '#6B6E6F', '#808182', '#949494', '#B1B1B1'];

  const graphMaxValues = selectGraphMaxValues();

  const multiAssetFilterHandle = () => {
    setState({
      ...state,
      multiAssetFilterChecked: !state.multiAssetFilterChecked,
    });
  };
  const quantitativeFilterHandle = () => {
    setState({
      ...state,
      quantitativeFilterChecked: !state.quantitativeFilterChecked,
    });
  };
  const esgFilterHandle = () => {
    setState({
      ...state,
      esgFilterChecked: !state.esgFilterChecked,
    });
  };
  const dspFilterHandle = () => {
    setState({
      ...state,
      dspFilterChecked: !state.dspFilterChecked,
    });
  };
  const dspTaxSensitiveFilterHandle = () => {
    setState({
      ...state,
      dspTaxSensitiveFilterChecked: !state.dspTaxSensitiveFilterChecked,
    });
  };

  const graphData = selectGraphData(
    multiAssetColors,
    quantitativeColors,
    esgColors,
    dspColors,
    dspTaxSensitiveColors,
    graphMaxValues,
    state.multiAssetFilterChecked,
    state.quantitativeFilterChecked,
    state.esgFilterChecked,
    state.dspFilterChecked,
    state.dspTaxSensitiveFilterChecked
  );

  const legendData = selectLegendData(
    multiAssetColors,
    quantitativeColors,
    esgColors,
    dspColors,
    dspTaxSensitiveColors,
    graphMaxValues,
    [
      {
        name: 'Multi-Asset',
        checked: state.multiAssetFilterChecked,
        handler: multiAssetFilterHandle,
      },
    ],
    [
      {
        name: 'Quantitative',
        checked: state.quantitativeFilterChecked,
        handler: quantitativeFilterHandle,
      },
    ],
    [
      {
        name: 'ESG',
        checked: state.esgFilterChecked,
        handler: esgFilterHandle,
      },
    ],
    [
      {
        name: 'DSP',
        checked: state.dspFilterChecked,
        handler: dspFilterHandle,
      },
    ],
    [
      {
        name: 'DSP TAX SENSITIVE',
        checked: state.dspTaxSensitiveFilterChecked,
        handler: dspTaxSensitiveFilterHandle,
      },
    ]
  );

  const nodeOnCLickHandler = (node: ScatterPlotNodeData<DotData>) => {
    if (node.data.link) {
      window.open('#' + node.data.link, '_blank');
    }
  };

  const graphDataXAverageValue = (graphMaxValues.minXValue + graphMaxValues.maxXValue) / 2;
  const graphDataYAverageValue = (graphMaxValues.minYValue + graphMaxValues.maxYValue) / 2;

  return (
    <>
      <ScatterPlotGraph
        loading={false}
        error={false}
        data={graphData}
        showQuadrants={false}
        showNodeLabel={false}
        setSelectedNodeId={setSelectedNodeId}
        selectedNodeId={selectedNodeId}
        maxXScale={scaleMaxValueMultiplier(graphMaxValues.maxXValue, 0.1, graphDataXAverageValue)}
        minXScale={scaleMinValueMultiplier(graphMaxValues.minXValue, 0.1, graphDataXAverageValue)}
        maxYScale={scaleMaxValueMultiplier(graphMaxValues.maxYValue, 0.1, graphDataYAverageValue)}
        minYScale={scaleMinValueMultiplier(graphMaxValues.minYValue, 0.1, graphDataYAverageValue)}
        onMouseClick={(node) => nodeOnCLickHandler(node)}
        startDate={'2020-12-12'}
      />
      <ScatterPlotGraphLegend
        nodeGroups={legendData}
        setSelectedNodeId={setSelectedNodeId}
        selectedNodeId={selectedNodeId}
      />
    </>
  );
};

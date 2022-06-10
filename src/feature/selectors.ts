import { IconType } from 'components/graphs/scatterplot/icons/GraphIcon';
import { getMinMaxValuesGeneric } from '../components/graphs/scatterplot/utils';
import { Filter } from '../components/graphs/scatterplot/legends/ScatterPlotGraphLegend';
import { Strategy } from './types';
import { multiAssetMappedData, quantitativeMappedData } from './mocks';
import { Data } from '../components/graphs/bar';
import { ScatterPlotRawSerie } from '@nivo/scatterplot/dist/types/types';
import { DotData } from '../components/graphs/scatterplot';
import {
  dspRaxSensitiveStrategiesToNodeGroup,
  dspStrategiesToGraphData,
  dspStrategiesToNodeGroup,
  dspTaxSensitiveStrategiesToGraphData,
  esgStrategiesToGraphData,
  esgStrategiesToNodeGroup,
  multiAssetStrategiesToGraphData,
  multiAssetStrategiesToNodeGroup,
  quantitativeStrategiesToGraphData,
  quantitativeStrategiesToNodeGroup,
} from './data-mappers';

const getRangeColorPicker = (min: number, max: number, colors: string[]) => {
  if (min > max) {
    return () => 'black';
  }
  const totalRange = Math.abs(min) + Math.abs(max);
  const range = totalRange / colors.length;
  return (nodeVal: number): string => {
    if (nodeVal <= min) {
      return colors[0];
    }
    const nodeRange = min * -1 + nodeVal;
    const colorIndex = Math.ceil(nodeRange / range) - 1;
    return colors[colorIndex];
  };
};

export const selectGraphMaxValues = () => {
  const strategies: Strategy[] = multiAssetMappedData.data.concat(
    quantitativeMappedData.data,
    quantitativeMappedData.data,
    quantitativeMappedData.data,
    quantitativeMappedData.data
  );
  return getMinMaxValuesGeneric(
    strategies,
    (item) => item.volatility,
    (item) => item.annualReturns
  );
};

export const selectGraphData = (
  assetsColors: string[],
  quantitativeColors: string[],
  esgColors: string[],
  dspColors: string[],
  dspTaxSensitiveColors: string[],
  minMaxValues: { maxYValue: number; minYValue: number; maxXValue: number; minXValue: number },
  showMultiAsset: boolean,
  showQuantitative: boolean,
  showESG: boolean,
  showDSP: boolean,
  showDSPTaxSensitive: boolean
) => {
  const multiAssetsColorPicker = getRangeColorPicker(
    minMaxValues.minYValue,
    minMaxValues.maxXValue,
    assetsColors
  );
  const quantitativeColorPicker = getRangeColorPicker(
    minMaxValues.minYValue,
    minMaxValues.maxXValue,
    quantitativeColors
  );
  const esgColorPicker = getRangeColorPicker(
    minMaxValues.minYValue,
    minMaxValues.maxXValue,
    esgColors
  );
  const dspColorPicker = getRangeColorPicker(
    minMaxValues.minYValue,
    minMaxValues.maxXValue,
    dspColors
  );
  const dspTaxSensitiveColorPicker = getRangeColorPicker(
    minMaxValues.minYValue,
    minMaxValues.maxXValue,
    dspTaxSensitiveColors
  );

  let graphData: ScatterPlotRawSerie<DotData>[] = [];
  if (showMultiAsset) {
    graphData = graphData.concat(
      multiAssetStrategiesToGraphData(
        multiAssetMappedData.data.filter(
          (strategy) => strategy.volatility != null && strategy.annualReturns != null
        ),
        multiAssetsColorPicker,
        IconType.circle
      )
    );
  }
  if (showQuantitative) {
    graphData = graphData.concat(
      quantitativeStrategiesToGraphData(
        quantitativeMappedData.data.filter(
          (strategy) => strategy.volatility != null && strategy.annualReturns != null
        ),
        quantitativeColorPicker,
        IconType.triangle
      )
    );
  }
  if (showESG) {
    graphData = graphData.concat(
      esgStrategiesToGraphData(
        quantitativeMappedData.data.filter(
          (strategy) => strategy.volatility != null && strategy.annualReturns != null
        ),
        esgColorPicker,
        IconType.square
      )
    );
  }
  if (showDSP) {
    graphData = graphData.concat(
      dspStrategiesToGraphData(
        quantitativeMappedData.data.filter(
          (strategy) => strategy.volatility != null && strategy.annualReturns != null
        ),
        dspColorPicker,
        IconType.rhombus
      )
    );
  }
  if (showDSPTaxSensitive) {
    graphData = graphData.concat(
      dspTaxSensitiveStrategiesToGraphData(
        quantitativeMappedData.data.filter(
          (strategy) => strategy.volatility != null && strategy.annualReturns != null
        ),
        dspTaxSensitiveColorPicker,
        IconType.triangleDown
      )
    );
  }
  return graphData;
};

export const selectLegendData = (
  assetsColors: string[],
  quantitativeColors: string[],
  esgColors: string[],
  dspColors: string[],
  dspTaxSensitiveColors: string[],
  maxValues: { maxYValue: number; maxXValue: number },
  multiAssetFilters: Filter[],
  quantitativeFilters: Filter[],
  esgFilters: Filter[],
  dspFilters: Filter[],
  dspTaxSensitiveFilters: Filter[]
) => {
  const multiAssetsColorPicker = getRangeColorPicker(0, maxValues.maxXValue, assetsColors);
  const quantitativeColorPicker = getRangeColorPicker(0, maxValues.maxXValue, quantitativeColors);
  const esgColorPicker = getRangeColorPicker(0, maxValues.maxXValue, esgColors);
  const dspColorPicker = getRangeColorPicker(0, maxValues.maxXValue, dspColors);
  const dspTaxSensitiveColorPicker = getRangeColorPicker(
    0,
    maxValues.maxXValue,
    dspTaxSensitiveColors
  );

  return [
    multiAssetStrategiesToNodeGroup(
      multiAssetsColorPicker,
      multiAssetMappedData.data,
      multiAssetFilters
    ),
    esgStrategiesToNodeGroup(esgColorPicker, quantitativeMappedData.data, esgFilters),
    quantitativeStrategiesToNodeGroup(
      quantitativeColorPicker,
      quantitativeMappedData.data,
      quantitativeFilters
    ),
    dspStrategiesToNodeGroup(dspColorPicker, quantitativeMappedData.data, dspFilters),
    dspRaxSensitiveStrategiesToNodeGroup(
      dspTaxSensitiveColorPicker,
      quantitativeMappedData.data,
      dspTaxSensitiveFilters
    ),
  ];
};

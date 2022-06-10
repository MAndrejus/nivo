import { Strategy, StrategySeries } from './types';

import { IconType } from '../components/graphs/scatterplot/icons/GraphIcon';
import { ScatterPlotRawSerie } from '@nivo/scatterplot/dist/types/types';
import { DotData } from '../components/graphs/scatterplot';
import {
  Filter,
  Node,
  NodeGroup,
} from '../components/graphs/scatterplot/legends/ScatterPlotGraphLegend';

export const multiAssetStrategiesToGraphData = (
  objs: Strategy[],
  colorPicker: (nodeVal: number) => string,
  icon: IconType
): ScatterPlotRawSerie<DotData>[] => {
  return objs.map((obj) => strategyToData(obj, colorPicker(obj.volatility), icon));
};

export const quantitativeStrategiesToGraphData = (
  objs: Strategy[],
  colorPicker: (nodeVal: number) => string,
  icon: IconType
): ScatterPlotRawSerie<DotData>[] => {
  return objs.map((obj) => strategyToData(obj, colorPicker(obj.volatility), icon));
};

export const esgStrategiesToGraphData = (
  objs: Strategy[],
  colorPicker: (nodeVal: number) => string,
  icon: IconType
): ScatterPlotRawSerie<DotData>[] => {
  return objs.map((obj) => strategyToData(obj, colorPicker(obj.volatility), icon));
};

export const dspStrategiesToGraphData = (
  objs: Strategy[],
  colorPicker: (nodeVal: number) => string,
  icon: IconType
): ScatterPlotRawSerie<DotData>[] => {
  return objs.map((obj) => strategyToData(obj, colorPicker(obj.volatility), icon));
};

export const dspTaxSensitiveStrategiesToGraphData = (
  objs: Strategy[],
  colorPicker: (nodeVal: number) => string,
  icon: IconType
): ScatterPlotRawSerie<DotData>[] => {
  return objs.map((obj) => strategyToData(obj, colorPicker(obj.volatility), icon));
};

const strategyToData = (
  obj: Strategy,
  color: string,
  icon: IconType
): ScatterPlotRawSerie<DotData> => {
  return {
    id: obj.printName,
    data: [
      {
        x: obj.volatility,
        y: obj.annualReturns,
        color: color,
        icon: icon,
        volatility: obj.volatility,
        annualReturns: obj.ytdReturn,
        sharpeRatio: obj.sharpe,
        link: '/' + obj.symbol,
      },
    ],
  };
};

export const multiAssetStrategiesToNodeGroup = (
  colorPicker: (nodeValue: number) => string,
  multiAssetStrategies: Strategy[],
  multiAssetFilters: Filter[]
): NodeGroup => {
  const columnCount = 2;

  return {
    name: StrategySeries.MULTI_ASSET,
    filters: multiAssetFilters,
    node: multiAssetStrategies.map((n) =>
      strategyToNode(n, colorPicker(n.volatility), IconType.circle)
    ),
    columns: columnCount,
  };
};

export const quantitativeStrategiesToNodeGroup = (
  colorPicker: (nodeValue: number) => string,
  quantitativeStrategies: Strategy[],
  quantitativeFilters: Filter[]
): NodeGroup => {
  return {
    name: StrategySeries.QUANTITATIVE,
    filters: quantitativeFilters,
    node: quantitativeStrategies.map((n) =>
      strategyToNode(n, colorPicker(n.volatility), IconType.triangle)
    ),
    columns: 1,
  };
};

export const esgStrategiesToNodeGroup = (
  colorPicker: (nodeValue: number) => string,
  esgStrategies: Strategy[],
  esgFilters: Filter[]
): NodeGroup => {
  return {
    name: StrategySeries.ESG,
    filters: esgFilters,
    node: esgStrategies.map((n) => strategyToNode(n, colorPicker(n.volatility), IconType.square)),
    columns: 1,
  };
};

export const dspStrategiesToNodeGroup = (
  colorPicker: (nodeValue: number) => string,
  dspStrategies: Strategy[],
  dspFilters: Filter[]
): NodeGroup => {
  return {
    name: StrategySeries.DSP,
    filters: dspFilters,
    node: dspStrategies.map((n) => strategyToNode(n, colorPicker(n.volatility), IconType.rhombus)),
    columns: 1,
  };
};

export const dspRaxSensitiveStrategiesToNodeGroup = (
  colorPicker: (nodeValue: number) => string,
  dspTaxSensitiveStrategies: Strategy[],
  dspTaxSensitiveFilters: Filter[]
): NodeGroup => {
  return {
    name: StrategySeries.DSP_TAX_SENSITIVE,
    filters: dspTaxSensitiveFilters,
    node: dspTaxSensitiveStrategies.map((n) =>
      strategyToNode(n, colorPicker(n.volatility), IconType.triangleDown)
    ),
    columns: 1,
  };
};

const strategyToNode = (obj: Strategy, color: string, icon: IconType): Node => {
  return {
    label: obj.printName,
    color: color,
    icon: icon,
    link: obj.symbol,
    linkTarget: '_blank',
  };
};

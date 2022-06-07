import { CustomLayer, Layer } from '@nivo/line';
import { Theme } from '@nivo/core';
import { graphColors } from 'core/colors';
import { CustomLegend } from './Layers';
import { LegendProps } from '@nivo/legends';
import { ProjectionData } from './LineGraph';

export const textStyle = (mode: 'mobile' | 'desktop') => ({
  fill: graphColors.text,
  fontSize: mode === 'mobile' ? 12 : 14,
  fontWeight: 500,
  fontFamily: 'Montserrat',
});

export const addLayers = (layers: CustomLayer[], projections?: CustomLayer[]): Layer[] => {
  const projectionLayers = projections || [];
  return [
    'grid',
    ...projectionLayers,
    'markers',
    'axes',
    'areas',
    'crosshair',
    'lines',
    'points',
    'slices',
    ...layers,
    'mesh',
    'legends',
  ];
};

export const theme = (mode: 'mobile' | 'desktop'): Theme => ({
  crosshair: {
    line: {
      strokeDasharray: '0',
      strokeWidth: 1,
      stroke: graphColors.blue,
    },
  },
  legends: { text: textStyle(mode) },
  labels: { text: textStyle(mode) },
  axis: {
    legend: {
      text: textStyle(mode),
    },
  },
});

export const legends = (
  legendProps?: Partial<LegendProps>,
  labels?: { label: string; color: string; id: string }[]
): LegendProps[] => [
  {
    anchor: 'bottom',
    direction: 'row',
    justify: false,
    translateY: 70,
    translateX: -30,
    itemDirection: 'left-to-right',
    itemWidth: 100,
    itemHeight: 20,
    itemsSpacing: 100,
    data: labels,
    symbolShape: CustomLegend,
    ...legendProps,
  },
];

export const findMinMaxValues = (projection?: ProjectionData, investmentTarget?: number) => {
  if (!investmentTarget) investmentTarget = 0;
  if (!projection) return { min: 0, max: 0 };
  let max = -Infinity;
  let min = Infinity;
  const { data } = projection;
  data.forEach((item) => {
    if (item.max > max) max = item.max;
    if (item.min < min) min = item.min;
  });
  if (investmentTarget > max) max = investmentTarget;
  return { min, max };
};

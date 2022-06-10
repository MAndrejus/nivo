import { ScatterPlotRawSerie } from '@nivo/scatterplot/dist/types/types';
import { DotData } from './ScatterPlotGraph';
import { IconType } from './icons/GraphIcon';

export const riskReturnsData: ScatterPlotRawSerie<DotData>[] = [
  {
    id: 'Current Retirement Fund',
    data: [
      {
        x: 5,
        y: 5,
        annualReturns: 5,
        volatility: 5,
        sharpeRatio: 5,
        color: '#FABE0F',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'Proposed Retirement Fund',
    data: [
      {
        x: 3,
        y: 15,
        annualReturns: 6,
        volatility: 15,
        sharpeRatio: 7,
        color: '#E576C6',
        icon: IconType.triangleDown,
        link: '',
      },
    ],
  },
  {
    id: 'S&P 500',
    data: [
      {
        x: 1,
        y: 9,
        annualReturns: 9,
        volatility: 9,
        sharpeRatio: 3,
        color: '#2E8FC2',
        icon: IconType.square,
        link: '',
      },
    ],
  },
];

export const scatterPlotGraphData: ScatterPlotRawSerie<DotData>[] = [
  {
    id: 'NT Strategic 0/100',
    data: [
      {
        x: 1,
        y: 1,
        annualReturns: 5,
        volatility: 5,
        sharpeRatio: 5,
        color: 'blue',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 10/90',
    data: [
      {
        x: 2,
        y: 2,
        annualReturns: 7,
        volatility: 7,
        sharpeRatio: 7,
        color: 'blue',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 20/80',
    data: [
      {
        x: 3,
        y: 3,
        annualReturns: 2,
        volatility: 2,
        sharpeRatio: 2,
        color: 'blue',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 30/70',
    data: [
      {
        x: 4,
        y: 4,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'blue',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 40/60',
    data: [
      {
        x: 5,
        y: 5,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'green',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 50/50',
    data: [
      {
        x: 6,
        y: 6,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'green',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 60/40',
    data: [
      {
        x: 7,
        y: 7,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'green',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 70/30',
    data: [
      {
        x: 8,
        y: 8,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'green',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 80/20',
    data: [
      {
        x: 9,
        y: 9,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'orange',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 90/10',
    data: [
      {
        x: 10,
        y: 10,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'orange',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Strategic 100/0',
    data: [
      {
        x: 11,
        y: 11,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'orange',
        icon: IconType.circle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Core All Assets Portfolio',
    data: [
      {
        x: 6,
        y: 8,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'green',
        icon: IconType.triangle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Capital Preservation',
    data: [
      {
        x: 7,
        y: 9,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'green',
        icon: IconType.triangle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Multi-factor Enhanced Income Strategy',
    data: [
      {
        x: 8,
        y: 10,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'green',
        icon: IconType.triangle,
        link: '',
      },
    ],
  },
  {
    id: 'NT Tech Leaders Portfolio',
    data: [
      {
        x: 9,
        y: 12,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'orange',
        icon: IconType.triangle,
        link: '',
      },
    ],
  },
  {
    id: 'NT US Dynamic Factors Machine Learning',
    data: [
      {
        x: 10,
        y: 12,
        annualReturns: 3,
        volatility: 3,
        sharpeRatio: 3,
        color: 'orange',
        icon: IconType.triangle,
        link: '',
      },
    ],
  },
];

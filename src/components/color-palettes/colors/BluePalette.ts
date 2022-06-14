import { Palette } from './types';

export const BluePalette: Palette = {
  title: 'Blue',
  colors: [
    {
      symbol: '100',
      value: '#cbeafa',
      darkText: true,
    },
    {
      symbol: '200',
      value: '#86d2f9',
      darkText: true,
    },
    {
      symbol: '300',
      value: '#4ab0e5',
      darkText: true,
    },
    {
      symbol: '400',
      value: '#258ec6',
      note: 'flash message',
    },
    {
      symbol: '500',
      value: '#0a699b',
    },
    {
      symbol: '600',
      value: '#165f86',
    },
    {
      symbol: '700',
      value: '#104866',
      note: 'primary blue',
    },
    {
      symbol: '800',
      value: '#0b3a54',
    },
    {
      symbol: '900',
      value: '#022e3c',
      note: 'popup heading',
    },
  ],
  additionalColors: [
    {
      symbol: '050',
      value: '#e5ebf1',
      note: 'hover state',
      darkText: true,
    },
    {
      symbol: '550',
      value: '#779fc2',
      note: 'selected border',
    },
  ],
};

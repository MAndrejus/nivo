import { Palette } from './types';

export const GreyPalette: Palette = {
  title: 'Grey',
  colors: [
    {
      symbol: '100',
      value: '#f6f6f6',
      note: 'page background',
      darkText: true,
    },
    {
      symbol: '200',
      value: '#d8d8d8',
      darkText: true,
    },
    {
      symbol: '300',
      value: '#b1b1b1',
      darkText: true,
    },
    {
      symbol: '400',
      value: '#979797',
    },
    {
      symbol: '500',
      value: '#808182',
      note: 'disabled, neutral',
    },
    {
      symbol: '600',
      value: '#565a5c',
    },
    {
      symbol: '700',
      value: '#565a5c',
    },
    {
      symbol: '800',
      value: '#3d4042',
    },
    {
      symbol: '900',
      value: '#3a3a3a',
      note: 'primary text',
    },
  ],
  additionalColors: [
    {
      symbol: '050',
      value: '#eaeaea',
      note: 'disabled background',
      darkText: true,
    },
    {
      symbol: '550',
      value: '#767676',
      note: 'ADA Compliant Placeholder Text',
    },
  ],
};

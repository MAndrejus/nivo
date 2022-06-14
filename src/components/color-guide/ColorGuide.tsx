import React from 'react';
import { Box } from '../box';
import classNames from 'classnames/bind';
import styles from './color-guide.module.scss';

const cx = classNames.bind(styles);

const colorGuideMap = [
  {
    group: 'Typography',
    colors: [
      {
        variable: '$primary-text-color',
        description: 'Primary text color',
        color: '#3a3a3a',
        paletteColor: '$grey-900',
      },
      {
        variable: '$secondary-text-color',
        description: 'Secondary text color',
        color: '#000000',
        paletteColor: '$black-color',
      },
      {
        variable: '$link-color',
        description: 'Link text color',
        color: '#0a699b',
        paletteColor: '$blue-500',
      },
      {
        variable: '$link-color-disabled',
        description: 'Disabled link text color',
        color: '#808182',
        paletteColor: '$grey-500',
      },
      {
        variable: '$warning-color',
        description: 'Warning text color',
        color: '#ac5300',
        paletteColor: '$orange-800',
      },
      {
        variable: '$error-color',
        description: 'Error text color',
        color: '#d04532',
        paletteColor: '$red-600',
      },
      {
        variable: '$negative-color',
        description: 'Negative text color',
        color: '#d04532',
        paletteColor: '$red-600',
      },
    ],
  },
  {
    group: 'Fields',
    colors: [
      {
        variable: '$placeholder-color',
        description: 'Placeholder text color',
        color: '#808182',
        paletteColor: '$grey-500',
      },
      {
        variable: '$border-color',
        description: 'Border color',
        color: '#979797',
        paletteColor: '$grey-400',
      },
      {
        variable: '$disabled-background',
        description: 'Disabled background',
        color: '#eaeaea',
        paletteColor: '$grey-050',
      },
    ],
  },
  {
    group: 'Backgrounds',
    colors: [
      {
        variable: '$page-background',
        description: 'Page background',
        color: '#f6f6f6',
        paletteColor: '$grey-100',
      },
      {
        variable: '$success-background',
        description: 'Success background',
        color: '#e6f7c4',
        paletteColor: '$green-100',
      },
      {
        variable: '$warning-background',
        description: 'Warning background',
        color: '#fff4c0',
        paletteColor: '$yellow-100',
      },
      {
        variable: '$error-background',
        description: 'Error background',
        color: '#ffe8e6',
        paletteColor: '$red-100',
      },
      {
        variable: '$hover-background',
        description:
          'Background hover color for custom element (table row, div blocks, button backgrounds)',
        color: '#e5ebf1',
        paletteColor: '$blue-050',
      },
    ],
  },
  {
    group: 'Global',
    colors: [
      {
        variable: '$border-color',
        description: 'Border color for custom element (table row, div blocks)',
        color: '#e5ebf1',
        paletteColor: '$blue-050',
      },
      {
        variable: '$border-hover-color',
        description: 'Border hover color',
        color: '#779fc2',
        paletteColor: '$blue-550',
      },
      {
        variable: '$element-hover-background',
        description:
          'Background hover color for custom element (table row, div blocks, button backgrounds)',
        color: '#e5ebf1',
        paletteColor: '$blue-050',
      },
    ],
  },
];

export const ColorGuide = () => {
  return (
    <Box>
      <div className={cx('color-guide')}>
        <h1 className={cx('color-guide__title')}>Existing Color Variables</h1>
        {colorGuideMap.map((group, groupIndex) => {
          return (
            <table className={cx('color-guide__table')} key={groupIndex}>
              <tbody>
                {group.colors.map((color, index) => {
                  return (
                    <tr key={index}>
                      <td>{color.variable}</td>
                      <td
                        style={{
                          backgroundColor: color.color,
                        }}
                      />
                      <td>
                        {color.color} - {color.paletteColor}
                      </td>
                      <td>{color.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    </Box>
  );
};

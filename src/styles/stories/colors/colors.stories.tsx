import React from 'react';
import { Colors } from './Colors';

const greyColors = `
$color-white: #fff;
$color-black: #000;
$color-black-light: #1a1919;

$color-grey-1: #3a3a3a; // text
$color-grey-2: #808182; // disabled, neutral
$color-grey-3: #d8d8d8;
$color-grey-4: #f3f3f3;
$color-grey-5: #ccc; // used only in checkbox
$color-grey-6: #979797; // used only once in Overview page
`;
const blueColors = `
$color-blue-0: #022e3c; // popup heading
$color-blue-1: #104866; // primary button
$color-blue-2: #0a699b;
$color-blue-3: #0090c7;
$color-blue-5: #e6f2f8;
$color-blue-7: #063d5b; // used only once in descriptions lists values
$color-blue-8: #0a699b;
$color-blue-8: #2e82cf; // used only once in flash messages
$color-teal: #00a0aa; // active and hover for grey and white elements
`;
const otherColors = `
$color-red-1: #d04532;
$color-green-1: #64a70b;
$color-yellow: #fabe0f;
$color-orange: #fa9619;
`;
const pieChartColors = `
$color-piechart-orange: #fa9619;
$color-piechart-yellow: #ffbd00;
$color-piechart-blue: #0092c5;
$color-piechart-purple: #8e3a80;
$color-piechart-green: #64a70b;
$color-piechart-red: #d04532;
`;
const barChartColors = `
$color-barchart-green: #0d818a;
$color-barchart-red: #d04532;
`;

const mapColors = (colorGroup: string) => {
  const colorsList = colorGroup.split(/\r?\n/).filter((value) => value.trim() !== '');
  const colorsToRender: Array<any> = [];
  function hexToRgb(hex: any) {
    return (
      hex
        // @ts-ignore
        .replace(/^([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)
        .match(/.{2}/g)
        .map((x: string) => parseInt(x, 16))
    );
  }
  function getBrightness(rgb: any) {
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  colorsList.forEach((color) => {
    const colorSplit = color.split(/[:;/,]{1,}/g).filter((value) => value.trim() !== '');
    if (colorSplit.length >= 2) {
      colorsToRender.push({
        variable: colorSplit[0].trim(),
        color: colorSplit[1].trim(),
        usages: colorSplit.slice(2),
        isLight: getBrightness(hexToRgb(colorSplit[1].trim().substr(1))) > 200,
      });
    }
  });
  return colorsToRender;
};

const ColorsStory = {
  title: 'Style Guide/Colors',
};

export default ColorsStory;

const colorGroups = [
  { title: 'Grey', colors: mapColors(greyColors) },
  { title: 'Blue', colors: mapColors(blueColors) },
  { title: 'Other', colors: mapColors(otherColors) },
  { title: 'Pie chart', colors: mapColors(pieChartColors) },
  { title: 'Bar chart', colors: mapColors(barChartColors) },
];

export const Overview = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/*// @ts-ignore*/}
      <Colors colorGroups={colorGroups} />
    </div>
  );
};

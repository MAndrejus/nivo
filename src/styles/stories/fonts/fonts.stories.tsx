import React from 'react';
import { Fonts } from './Fonts';

const fontsCode = `
$font-family: 'Montserrat'; // 400, 500, 600, 400 italic
`;
const fontsList = fontsCode.split(/\r?\n/).filter((value) => value.trim() !== '');
const fontsToRender: any = [];
fontsList.forEach((font) => {
  const fontSplit = font.split(/[:;/,]{1,}/g).filter((value) => value.trim() !== '');
  if (fontSplit.length >= 2) {
    fontsToRender.push({
      variable: fontSplit[0].trim(),
      font: fontSplit[1].trim(),
      weights: fontSplit.slice(2),
    });
  }
});

const FontsStory = {
  title: 'Style Guide/Fonts',
};

export default FontsStory;

// @ts-ignore
export const Overview = ({ size }) => {
  return <Fonts fonts={fontsToRender} size={size} />;
};

Overview.args = {
  size: 14,
};

Overview.argTypes = {
  size: { control: { type: 'number' }, name: 'Font Size' },
};

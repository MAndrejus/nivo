import { Serie as Data } from '@nivo/line';

export const GRAPH_LINE_COLOR = '#b1b1b1';
export const CIRCLE_GREY = '#d8d8d8';
export const CIRCLE_BLUE = '#0a699b';
export const DARK_GREY = '#3d4042';
export const LIGHT_GREY = '#6c6c6c';

export const tickTextStyle = {
  fill: LIGHT_GREY,
  fontSize: 14,
  fontFamily: 'Montserrat',
};
export const legendStyle = {
  fontSize: 14,
  fill: DARK_GREY,
  fontWeight: 500,
  fontFamily: 'Montserrat',
};

export const getMinMaxValues = (data: Data[]) => {
  return getMinMaxValuesGeneric(
    data,
    (item) => item.data[0].x as number,
    (item) => item.data[0].y as number
  );
};

export const getMinMaxValuesGeneric = <T>(
  data: T[],
  xSelector: (item: T) => number,
  ySelector: (item: T) => number
) => {
  let maxXValue = Number.MIN_VALUE;
  let minXValue = Number.MAX_VALUE;
  let maxYValue = Number.MIN_VALUE;
  let minYValue = Number.MAX_VALUE;
  data.forEach((item) => {
    const x = xSelector(item);
    const y = ySelector(item);
    if (x != null && x > maxXValue) maxXValue = x;
    if (x != null && x < minXValue) minXValue = x;
    if (y != null && y > maxYValue) maxYValue = y;
    if (y != null && y < minYValue) minYValue = y;
  });
  return {
    maxXValue,
    minXValue,
    maxYValue,
    minYValue,
  };
};

export const scaleMaxValueMultiplier = (value: number, multiplier: number, scaleSize?: number) => {
  const scale = scaleSize ? Math.abs(scaleSize) * multiplier : Math.abs(value) * multiplier;
  return value + scale;
};

export const scaleMinValueMultiplier = (value: number, multiplier: number, scaleSize?: number) => {
  const scale = scaleSize ? Math.abs(scaleSize) * multiplier : Math.abs(value) * multiplier;
  return value - scale;
};

export const average = (...values: number[]) => {
  return (
    values.reduce((previousValue, currentValue) => previousValue + currentValue) / values.length
  );
};

import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styles from './historical-returns-bar-chart.module.scss';
import classNames from 'classnames/bind';
import { CustomLegends, CustomBar, CustomAxes } from './Layers';
import { useBreakpointDetector } from 'core/window';
import {
  NET_RETURNS_COLOR,
  NET_LOSSES_COLOR,
  NET_RANGE_COLOR,
  textStyle,
  mobileMargins,
  desktopMargins,
  CHART_HEIGHT,
} from './constants';

const cx = classNames.bind(styles);

export interface Data {
  date: string;
  value: number;
  range?: number;
}

export interface Props {
  data?: Data[];
}

export const HistoricalReturnsBarChart = (props: Props) => {
  const isMobileLandscape = useBreakpointDetector({ to: 'mobile-landscape' });

  let { data } = props;
  if (!data) return null;

  let max = 0;
  let min = 0;

  data.forEach((item) => {
    const { value } = item;
    if (value > max) max = value;
    if (value < min) min = value;
  });

  const total = max + -min;
  const maxValue = max + total * 0.2;
  const minValue = min - total * 0.2;

  return (
    <div
      className={cx('container')}
      style={{
        height: CHART_HEIGHT + 'px',
        minWidth: isMobileLandscape ? data.length * 13 + 'px' : '',
      }}
    >
      <ResponsiveBar
        maxValue={maxValue}
        minValue={minValue}
        data={data}
        keys={['range', 'value']} // Key position must be this way
        indexBy="date"
        margin={isMobileLandscape ? mobileMargins : desktopMargins}
        padding={0}
        enableGridY={false}
        enableGridX={false}
        colors={[NET_RETURNS_COLOR, NET_LOSSES_COLOR, NET_RANGE_COLOR]}
        axisTop={null}
        axisRight={null}
        layers={['grid' as any, 'axes', 'bars', 'markers', 'legends', CustomAxes, CustomLegends]}
        theme={{
          axis: {
            ticks: {
              text: { ...textStyle, fontSize: isMobileLandscape ? '14px' : '15px' },
            },
          },
        }}
        axisBottom={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (v) => v + '%',
        }}
        barComponent={(bar) => CustomBar(bar, data?.length)}
        animate={false}
        motionStiffness={500}
        motionDamping={15}
      />
    </div>
  );
};

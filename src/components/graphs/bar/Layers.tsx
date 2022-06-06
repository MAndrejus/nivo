import { CustomLayer } from '@nivo/line';
import { BarItemProps } from '@nivo/bar';
import styles from './historical-returns-bar-chart.module.scss';
import React from 'react';
import classNames from 'classnames/bind';
import { text } from './text';
import {
  AXIS_COLOR,
  CENTER_AXIS_COLOR,
  CHART_HEIGHT,
  desktopMargins,
  mobileMargins,
  NET_LOSSES_COLOR,
  NET_RANGE_COLOR,
  NET_RETURNS_COLOR,
  textStyle,
} from './constants';
import { useBreakpointDetector } from '../../../core/window';

const cx = classNames.bind(styles);

export const CustomAxes: CustomLayer = (layer: any) => {
  return (
    <g>
      <line x1={0} x2={layer.width} y1={layer.height} y2={layer.height} stroke={AXIS_COLOR} />
      <line x1={0} x2={0} y1={0} y2={layer.height} stroke={AXIS_COLOR} />
    </g>
  );
};

export const CustomBar = (bar: BarItemProps, length: number = 0) => {
  const isMobileLandscape = useBreakpointDetector({ to: 'mobile-landscape' });
  const margin = isMobileLandscape ? mobileMargins : desktopMargins;
  const { id, value, indexValue } = bar.data;
  const { index } = bar.data as any;
  let color = '';
  if (id === 'value' && value > 0) color = NET_RETURNS_COLOR;
  if (id === 'value' && value < 0) color = NET_LOSSES_COLOR;
  if (id === 'range') color = NET_RANGE_COLOR;

  // Three layers are generated on each other (net, min, max)
  // To get hover effect we add text and hovered area just on "max" layer
  const renderPositiveValues = () => {
    if (id !== 'value' || value <= 0) return null;
    return (
      <text
        className={cx('value')}
        x={bar.x + bar.width / 2 - 15}
        y={bar.y - 15}
        fill={NET_RETURNS_COLOR}
      >
        +{value.toFixed(1)}%
      </text>
    );
  };

  const renderNegativeValues = () => {
    if (id !== 'value' || value >= 0) return null;
    return (
      <text
        className={cx('value')}
        x={bar.x + bar.width / 2 - 15}
        y={bar.y + bar.height + 20}
        fill={NET_LOSSES_COLOR}
      >
        {value.toFixed(1)}%
      </text>
    );
  };

  const renderCenterLine = () => {
    if (index === 0) {
      const height = value > 0 ? bar.height : 0;
      return (
        <g>
          <line
            x1={0}
            x2={1200}
            y1={bar.y + height}
            y2={bar.y + height}
            stroke={CENTER_AXIS_COLOR}
          />
        </g>
      );
    }
  };

  // There is no way to modify label's text
  // We create custom one for each bar at the bottom
  const renderLabels = () => {
    const divider = isMobileLandscape ? Math.ceil(length / 5) : Math.ceil(length / 8);
    if (id !== 'value') return null;
    if (index % divider > 0) return null;
    const labelText = () => {
      return (
        <text x={bar.width / 2 - 12} y={30} style={{ ...textStyle, fontSize: '14px' }}>
          {indexValue}
        </text>
      );
    };

    return (
      <g transform={`translate(${bar.x} ${offset})`}>
        <rect fill={AXIS_COLOR} x={bar.width} width={1} height={8} />
        {labelText()}
      </g>
    );
  };

  const offset = CHART_HEIGHT - margin.bottom - margin.top;

  const desktopWidth = length < 20 ? 14 : 8;
  const desktopX = length < 20 ? bar.width / 2 - 7 : bar.width / 2 - 4;
  const mobileWidth = length <= 13 ? 8 : 4;
  const mobileX = length <= 13 ? bar.width / 2 - 4 : bar.width / 2 - 1;
  return (
    <g className={cx('bar')}>
      <g transform={`translate(${bar.x} ${bar.y})`}>
        <rect
          width={isMobileLandscape ? mobileWidth : desktopWidth}
          height={bar.height}
          fill={color}
          x={isMobileLandscape ? mobileX : desktopX}
          y={0}
        />
      </g>
      {id === 'value' && (
        <rect className={cx('rect')} x={bar.x} width={bar.width} height={offset} />
      )}
      {renderPositiveValues()}
      {renderNegativeValues()}
      {renderLabels()}
      {renderCenterLine()}
    </g>
  );
};

export const CustomLegends: CustomLayer = (data: any) => {
  return (
    <g transform={`translate(${data.width / 2 - 40} ${data.height + 85})`}>
      <rect width={11} height={11} fill={NET_RETURNS_COLOR} x={-20} y={-10} />
      <text fontSize={15}>{text['net-returns']}</text>
      <rect width={11} height={11} fill={NET_LOSSES_COLOR} x={110} y={-10} />
      <text fontSize={15} x={130}>
        {text['net-losses']}
      </text>
    </g>
  );
};

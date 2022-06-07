import React, { useState } from 'react';
import { abbreviateNumber } from 'core/utils';
import moment from 'moment';
import { CustomLayer, CustomLayerProps } from '@nivo/line';
import { textStyle } from './config';
import { numberWithCommas, MOBILE_BREAKPOINT } from 'core/utils';
import { Tooltip } from './Tooltip';
import classNames from 'classnames/bind';
import styles from './line-graph.module.scss';
import { graphColors } from 'core/colors';
import { text } from './text';
import { useBreakpointDetector } from 'core/window';
import { ProjectionData, ProjectionDatum } from './LineGraph';
import { area, curveCardinal } from 'd3-shape';

const cx = classNames.bind(styles);

const HeadingFormats = {
  date: 'MMM D, YYYY',
  year: `[${text['graph.slice.tooltip.year']}] YYYY`,
};

export type SliceTooltipHeadingFormat = 'date' | 'year';

export const ProjectionLayer = (areaData: ProjectionData): CustomLayer => {
  const { data, color } = areaData;
  return ({ xScale, yScale }) => {
    const areaGenerator = area<ProjectionDatum>()
      .x((d) => {
        const fullDate = d.x! as string;
        return xScale(new Date(fullDate));
      })
      .y0((d) => yScale(d.min))
      .y1((d) => yScale(d.max))
      .curve(curveCardinal);
    return (
      <path
        d={areaGenerator(data)!}
        fill={color}
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      />
    );
  };
};

export const ProjectionPointer = (date: string) => {
  return (layer: CustomLayerProps) => {
    const { xScale, innerHeight } = layer;
    const x = xScale(new Date(date));
    return (
      <g>
        <text
          x={x + 10}
          y={10}
          fill={graphColors.projectionLine}
          fontWeight={400}
          fontSize={14}
          fontStyle="italic"
        >
          {text['graph.projection']}
        </text>
        <line
          x1={x}
          x2={x}
          y1={0}
          y2={innerHeight}
          stroke={graphColors.projectionLine}
          strokeDasharray={3}
          strokeWidth={1}
        />
      </g>
    );
  };
};

export const SideDots: CustomLayer = (layer: any) => {
  const [leftTooltip, showLeftTooltip] = useState(false);
  const [rightTooltip, showRightTooltip] = useState(false);
  const firstPoint = layer.points[0];
  const lastPoint = layer.points[layer.points.length - 1];
  const gapWidth = layer.points[1]?.x || 100;
  return (
    <>
      {leftTooltip && (
        <g transform={`translate(0 ${firstPoint.y - 25})`}>
          <foreignObject width={180} height={50}>
            <div className={cx('side-tooltip', 'side-tooltip--left')}>
              <div className={cx('amount')}>
                ${numberWithCommas(Math.round(firstPoint.data.y) as number)}
              </div>
              <div className={cx('title')}>{text['graph.initial-investment']}</div>
            </div>
          </foreignObject>
        </g>
      )}
      <circle
        onMouseLeave={() => showLeftTooltip(false)}
        onMouseEnter={() => showLeftTooltip(true)}
        className={cx('side-dot')}
        r={4}
        cx={0}
        cy={firstPoint.y}
        fill={graphColors.blue}
      />
      <rect
        onMouseLeave={() => showLeftTooltip(false)}
        onMouseEnter={() => showLeftTooltip(true)}
        x={0}
        y={0}
        height={layer.innerHeight}
        width={gapWidth / 1.5}
        fill="rgba(0,0,0, 0)"
      />
      {rightTooltip && (
        <g transform={`translate(${layer.innerWidth - 180} ${lastPoint.y - 25})`}>
          <foreignObject width={180} height={50}>
            <div className={cx('side-tooltip', 'side-tooltip--right')}>
              <div className={cx('amount')}>
                ${numberWithCommas(Math.round(lastPoint.data.y) as number)}
              </div>
              <div className={cx('title')}>{text['graph.estimate-outcome']}</div>
            </div>
          </foreignObject>
        </g>
      )}
      <circle
        className={cx('side-dot')}
        r={4}
        cx={layer.innerWidth}
        cy={lastPoint.y}
        fill={graphColors.blue}
      />
      <rect
        onMouseLeave={() => showRightTooltip(false)}
        onMouseEnter={() => showRightTooltip(true)}
        x={layer.innerWidth - gapWidth / 1.5}
        y={0}
        height={layer.innerHeight}
        width={gapWidth / 1.5}
        fill="rgba(0,0,0, 0)"
      />
    </>
  );
};

export const InvestmentTarget = (target: number) => {
  return (layer: CustomLayerProps) => {
    const y = layer.yScale(target);
    const style = {
      fill: graphColors.text,
      fontSize: window.innerWidth >= MOBILE_BREAKPOINT ? 14 : 12,
      fontWeight: 600,
    };
    return (
      <g transform={`translate(0 ${y})`}>
        <text y={-6} style={style}>
          {text['graph.investment-target']} ${numberWithCommas(Math.round(target))}
        </text>
        <line
          x1={0}
          x2={layer.innerWidth}
          y1={0}
          y2={0}
          stroke={graphColors.orange}
          strokeWidth={2}
        />
      </g>
    );
  };
};

export const CustomLegend = (layer: any) => {
  const isMobileLandscape = useBreakpointDetector({ to: 'mobile-landscape' });

  if (layer.id === text['graph.legend.range-of-outcomes']) {
    return (
      <g>
        <rect
          x={isMobileLandscape ? -12 : -4}
          y={2}
          width={15}
          height={15}
          fill={graphColors.blueTransparent}
        />
      </g>
    );
  }
  return (
    <g>
      <rect x={-15} y={10} width={20} height={2} fill={layer.fill} />
    </g>
  );
};

export const YAxisTick = (tick: any, position: string, units: string) => {
  const isMobileLandscape = useBreakpointDetector({ to: 'mobile-landscape' });
  const transformLeft = position === 'left' ? -55 : 30;
  return (
    <g transform={`translate(${transformLeft} ${tick.y * 1})`}>
      {units === '%' ? (
        <text
          textAnchor="start"
          dominantBaseline="middle"
          style={textStyle(isMobileLandscape ? 'mobile' : 'desktop')}
        >
          {tick.value}%
        </text>
      ) : (
        <text
          textAnchor="start"
          dominantBaseline="middle"
          style={textStyle(isMobileLandscape ? 'mobile' : 'desktop')}
        >
          {tick.value >= 0
            ? abbreviateNumber(tick.value)
            : '-' + abbreviateNumber(Math.abs(tick.value))}
        </text>
      )}
    </g>
  );
};

export const XAxisTick = (tick: any, startingDate: string) => {
  const isMobileLandscape = useBreakpointDetector({ to: 'mobile-landscape' });

  const renderTick = (x: number, y: number, date: string) => {
    return (
      <g transform={`translate(${x},${y + 12})`}>
        <line stroke={graphColors.lines} strokeWidth={1} y1={-12} y2={-4} />
        <text
          transform={`translate(-15, 4)`}
          textAnchor="start"
          dominantBaseline="hanging"
          style={textStyle(isMobileLandscape ? 'mobile' : 'desktop')}
        >
          {moment(date).format('YYYY')}
        </text>
      </g>
    );
  };
  return (
    <>
      {tick.tickIndex === 0 && tick.x > 30 && renderTick(0, tick.y, startingDate)}
      {renderTick(tick.x, tick.y, tick.value)}
    </>
  );
};

interface TooltipProps {
  data: any;
  units: '%' | '$';
  unitsPosition?: 'start' | 'end';
  dataCount?: number;
  headingFormat?: SliceTooltipHeadingFormat;
  investmentTarget?: number;
  withColors?: boolean;
  valueDecimals?: number;
}
export const renderTooltip = (tooltipProps: TooltipProps) => {
  const {
    data,
    headingFormat = 'date',
    units,
    investmentTarget,
    withColors,
    unitsPosition = 'start',
    valueDecimals,
    dataCount,
  } = tooltipProps;
  const { slice } = data;
  // @ts-ignore
  const tooltipData = slice.points.map((point, i) => {
    return {
      key: point.serieId,
      min: point.data.min,
      max: point.data.max,
      value: numberWithCommas(point.data.y, valueDecimals),
      color: point.color,
      active: i % 2 !== 0,
    };
  });
  if (investmentTarget && (slice.points[0]?.index === 0 || slice.points[0]?.index === dataCount)) {
    return null;
  }

  return (
    <Tooltip
      heading={moment(slice.points[0]?.data.xFormatted).format(HeadingFormats[headingFormat])}
      data={tooltipData}
      units={units}
      unitsPosition={unitsPosition}
      withColors={withColors}
    />
  );
};

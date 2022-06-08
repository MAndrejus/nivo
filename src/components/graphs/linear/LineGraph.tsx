import React from 'react';
import { ResponsiveLine, CustomLayer, LineSvgProps, CustomLayerProps } from '@nivo/line';
import { AxisProps } from '@nivo/axes';
import { addLayers, theme, legends, findMinMaxValues } from './config';
import {
  SliceTooltipHeadingFormat,
  XAxisTick,
  YAxisTick,
  InvestmentTarget,
  SideDots,
  renderTooltip,
  ProjectionLayer,
  ProjectionPointer,
} from './Layers';
import classNames from 'classnames/bind';
import styles from './line-graph.module.scss';
import { text } from './text';
import moment from 'moment';
import { useBreakpointDetector } from 'core/window';
import { LegendProps } from '@nivo/legends';
import { NoDataError } from '../../no-data-error';
import { Scale } from '@nivo/scales';

const cx = classNames.bind(styles);

type curveType =
  | 'basis'
  | 'cardinal'
  | 'catmullRom'
  | 'linear'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'step'
  | 'stepAfter'
  | 'stepBefore';

export interface GraphProps {
  data: GraphData[];
  error?: boolean;
  errorMessage?: string;
  projectionData?: ProjectionData[];
  investmentTarget?: number;
  maxLegendLength?: number;
  min?: number;
  max?: number;
  units?: '$' | '%';
  tooltip?: {
    unitsPosition?: 'start' | 'end';
    withColors?: boolean;
    valueDecimals?: number;
    headingFormat?: SliceTooltipHeadingFormat;
  };
  currentDateLabel?: boolean;
  ticks?: number;
  rangeOfOutcomesLabel?: boolean;
  disableLegend?: boolean;
  curve?: curveType;
  legendsProps?: Partial<LegendProps>;
  className?: string;
  xAxisLegend?: string;
  verticalAxisPosition?: 'left' | 'right';
  timeInterval?: number;
  withProjectionBreakpoint?: boolean;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export interface GraphData {
  id: string;
  data: Datum[];
  color: string;
  name?: string;
}

export interface Datum {
  x: string; // date format: yyyy-mm-dd
  y: number;
  min?: number;
  max?: number;
}

export interface ProjectionData {
  color: string;
  data: ProjectionDatum[];
}

export interface ProjectionDatum {
  x: string;
  y?: number;
  min: number;
  max: number;
}

export const LineGraph = (props: GraphProps) => {
  const isMobileLandscape = useBreakpointDetector({ to: 'mobile-landscape' });
  const {
    maxLegendLength,
    projectionData,
    withProjectionBreakpoint,
    investmentTarget,
    rangeOfOutcomesLabel,
    curve,
    disableLegend,
    verticalAxisPosition = 'left',
    timeInterval,
    ticks = 3,
    currentDateLabel,
    units = '$',
    className,
    margin,
    legendsProps,
    xAxisLegend,
    tooltip,
    error,
    errorMessage,
  } = props;
  let { data, min, max } = props;

  if (error) return <NoDataError message={errorMessage} />;

  if (!data || !data[0]) return null;

  // Check for corrupted data
  if (data[0].data.length === 0) return <NoDataError />;
  if (data[0].data.find((item) => item.x === null)) return <NoDataError />;
  if (data[1]?.data.find((item) => item.x === null)) return <NoDataError />;

  const layers: CustomLayer[] = [];

  if (investmentTarget) {
    layers.push(InvestmentTarget(investmentTarget));
    layers.push(SideDots);
  }
  if (withProjectionBreakpoint && projectionData?.[0]?.data[0]) {
    layers.push(ProjectionPointer(projectionData[0].data[0].x));
  }

  if (!max && !min && projectionData) {
    const portfolioPoint = findMinMaxValues(projectionData[0], investmentTarget);
    const benchmarkPoint = findMinMaxValues(projectionData[1], investmentTarget);
    max = Math.max(benchmarkPoint.max, portfolioPoint.max) * 1.1;
    min = Math.min(benchmarkPoint.min, portfolioPoint.min) * 1.1;
    min = min < 0 ? min : 0;
  }

  const projectionLayers = projectionData?.map((projectionData) => ProjectionLayer(projectionData));

  const getDefaultTimeInterval = (): number => {
    const divider = isMobileLandscape ? 4 : 6;
    const length = data[0].data.length;
    const startDate = data[0].data[0].x;
    const endDate = data[0].data[length - 1].x;
    const startYear = moment(startDate).year();
    const endYear = moment(endDate).year();
    const difference = endYear - startYear;
    const interval = Math.floor(difference / divider);
    return interval <= 0 ? 1 : interval;
  };

  const colors: string[] = data.map((record) => record.color);
  const dataCount = data[0]?.data.length - 1;

  const verticalAxis: AxisProps = {
    legend: xAxisLegend,
    legendPosition: 'middle',
    legendOffset: verticalAxisPosition === 'left' ? -80 : 100,
    tickValues: ticks,
    renderTick: (tick) => YAxisTick(tick, verticalAxisPosition, units),
  };

  if (rangeOfOutcomesLabel) {
    data = [{ id: text['graph.legend.range-of-outcomes'], color: '', data: [] }, ...data];
  }

  let customLegends;
  if (maxLegendLength && maxLegendLength > 0) {
    customLegends = data.map((item) => {
      if (!item?.name) return { ...item, label: '' };
      return item.name.length > maxLegendLength!
        ? { ...item, label: item.name.slice(0, maxLegendLength) + '...' }
        : { ...item, label: item.name || '' };
    });
  }

  return (
    <div className={cx('container', className)}>
      {currentDateLabel && (
        <div className={cx('date-label')}>
          {text['graph.date-label.prefix']}
          {moment().format('MM/DD/YYYY')}
        </div>
      )}
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 70, left: 80, ...(margin ? margin : {}) }}
        gridYValues={ticks}
        yScale={{
          type: 'linear',
          min: typeof min === 'number' ? min : 'auto',
          max: typeof max === 'number' ? max : 'auto',
        }}
        enableGridX={false}
        axisTop={null}
        xFormat="time:%Y-%m-%d"
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
        }}
        curve={curve}
        axisBottom={{
          format: '%Y',
          tickValues: `every ${timeInterval || getDefaultTimeInterval()} years`,
          ticksPosition: 'before',
          renderTick: (tick) => {
            if (data[0]?.data[0]?.x) return XAxisTick(tick, data[0].data[0].x);
            return XAxisTick(tick, data[1].data[0].x);
          },
        }}
        axisRight={verticalAxisPosition === 'right' ? verticalAxis : null}
        axisLeft={verticalAxisPosition === 'left' ? verticalAxis : null}
        enablePoints={false}
        colors={colors}
        useMesh={true}
        layers={addLayers(layers, projectionLayers)}
        theme={theme(isMobileLandscape ? 'mobile' : 'desktop')}
        enableSlices="x"
        sliceTooltip={(slice) =>
          renderTooltip({
            data: slice,
            units,
            unitsPosition: tooltip?.unitsPosition,
            dataCount,
            headingFormat: tooltip?.headingFormat,
            investmentTarget,
            withColors: tooltip?.withColors,
            valueDecimals: tooltip?.valueDecimals,
          })
        }
        legends={!disableLegend ? legends(legendsProps, customLegends) : undefined}
      />
    </div>
  );
};

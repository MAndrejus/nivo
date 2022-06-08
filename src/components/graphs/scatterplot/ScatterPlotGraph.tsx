import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './scatterplot-graph.module.scss';
import { text } from './text';
import {
  ResponsiveScatterPlot,
  Serie,
  Datum,
  CustomSvgLayer,
  CustomLayerId,
  Value,
  Node,
} from '@nivo/scatterplot';
// ScatterPlot TS lib has no options to add extra params to data.
// We use Serie from Line graph to get around this.
import {
  XAxisLabels,
  YAxisLabels,
  NodeRenderer,
  XAxisLine,
  YAxisLegend,
  YAxisLine,
  QuadrantsAxis,
} from './Layers';
import {
  legendStyle,
  getMinMaxValues,
  scaleMaxValueMultiplier,
  scaleMinValueMultiplier,
  average,
} from './utils';
import { numberWithCommas } from 'core/utils';
import { Tooltip } from '../tooltip';
import { useBreakpointDetector } from '../../../core/window';
import { IconType } from './icons/GraphIcon';
import { QuestionMark } from '../../question-mark';
import { NoDataError } from '../../no-data-error';

const cx = classNames.bind(styles);

export interface DotNode extends Node {
  data: {
    id: string | number;
    serieId: string;
    x: Value;
    formattedX: string | number;
    y: Value;
    formattedY: string | number;
    annualReturns: number;
    volatility: number;
    sharpeRatio: number;
    color?: string;
    icon?: IconType;
    link?: string;
  };
}

export interface DotData extends Datum {
  annualReturns: number;
  volatility: number;
  sharpeRatio: number;
  color?: string;
  icon?: IconType;
  link?: string;
}

export interface Data extends Serie {
  data: DotData[];
}

export type MouseHandler = (node: DotNode, event: React.MouseEvent<any>) => void;

export interface ScatterPlotGraphProps {
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  data?: Data[];
  axisColors?: string[];
  showQuadrants?: boolean;
  showNodeLabel?: boolean;
  onMouseClick?: MouseHandler;
  setSelectedNodeId?: (id: string | null) => void;
  selectedNodeId?: string | null;
  maxYScale?: number;
  minYScale?: number;
  maxXScale?: number;
  minXScale?: number;
  startDate?: string;
  disclaimerType?: string;
}

export const ScatterPlotGraph = (props: ScatterPlotGraphProps) => {
  const {
    loading,
    data,
    showQuadrants,
    showNodeLabel = true,
    setSelectedNodeId,
    selectedNodeId,
    onMouseClick,
    startDate,
    disclaimerType,
    error,
    errorMessage,
  } = props;

  const [graphNodeId, setGraphNodeId] = useState<string | null>(null);

  const isMobileView = useBreakpointDetector({ to: 'large-desktop' });
  const useLocalNodeId = setSelectedNodeId === undefined || selectedNodeId === undefined;

  if (error) return <NoDataError message={errorMessage} />;

  const margin = isMobileView
    ? { top: 40, right: 10, bottom: 60, left: 30 }
    : { top: 20, right: 40, bottom: 60, left: 135 };

  if (!data || loading) return null;

  let { maxYScale, minYScale, maxXScale, minXScale } = props;
  if (!maxYScale || !minYScale || !maxXScale || !minXScale) {
    const { maxYValue, minYValue, maxXValue, minXValue } = getMinMaxValues(data);
    const xAvg = average(minXValue, maxXValue);
    const yAvg = average(minYValue, maxYValue);
    maxYScale = maxYScale
      ? maxYScale
      : isMobileView
      ? maxYValue
      : scaleMaxValueMultiplier(maxYValue, 0.15, yAvg);
    minYScale = minYScale
      ? minYScale
      : isMobileView
      ? minYValue
      : scaleMinValueMultiplier(minYValue, 0.15, yAvg);
    maxXScale = maxXScale
      ? maxXScale
      : isMobileView
      ? maxXValue
      : scaleMaxValueMultiplier(maxXValue, 0.4, xAvg);
    minXScale = minXScale
      ? minXScale
      : isMobileView
      ? minXValue
      : scaleMinValueMultiplier(minXValue, 0.1, xAvg);
  }

  const layers: Array<CustomLayerId | CustomSvgLayer> = [];
  layers.push('grid', 'axes');
  if (showQuadrants) {
    layers.push(QuadrantsAxis);
  }
  layers.push(
    'markers',
    'legends',
    XAxisLabels,
    YAxisLabels,
    YAxisLine,
    XAxisLine(props.axisColors),
    YAxisLegend,
    'nodes',
    renderTooltip(selectedNodeId)
  );

  return (
    <div className={cx('graph')}>
      {startDate && (
        <QuestionMark
          on="hover"
          tooltipPosition="label"
          text={text['explanation.annualized-returns'](startDate, disclaimerType)}
          className={cx('explanation', 'explanation--left')}
        />
      )}
      {startDate && (
        <QuestionMark
          on="hover"
          tooltipPosition="label"
          text={text['explanation.volatility'](startDate)}
          className={cx('explanation', 'explanation--bottom')}
        />
      )}
      <ResponsiveScatterPlot
        data={data as Serie[]}
        layers={layers}
        margin={margin}
        xScale={{ type: 'linear', min: minXScale, max: maxXScale }}
        yScale={{ type: 'linear', min: minYScale, max: maxYScale }}
        blendMode="multiply"
        axisTop={null}
        markers={[]}
        axisRight={null}
        axisBottom={{
          legend: text['expected-risk'],
          legendPosition: 'middle',
          legendOffset: 35,
          tickValues: 0,
        }}
        axisLeft={{
          tickValues: 0,
          legendPosition: 'middle',
          legendOffset: -80,
        }}
        theme={{
          axis: {
            legend: {
              text: legendStyle,
            },
          },
        }}
        nodeSize={15}
        gridXValues={0}
        gridYValues={0}
        renderNode={(dot) =>
          NodeRenderer(
            dot,
            maxXScale,
            isMobileView,
            showNodeLabel,
            useLocalNodeId ? setGraphNodeId : setSelectedNodeId,
            useLocalNodeId ? graphNodeId : selectedNodeId,
            onMouseClick
          )
        }
      />
    </div>
  );
};

const renderTooltip = (selectedNodeId?: string | null) => (tooltip: any) => {
  if (selectedNodeId === null) {
    return null;
  }

  const node = tooltip.nodes.find((node: any) => node.data.serieId === selectedNodeId);
  if (!node) {
    return null;
  }

  const tooltipData = [
    {
      key: text['tooltip.annual-returns'],
      value: numberWithCommas(node.data.annualReturns) + '%',
    },
    { key: text['tooltip.volatility'], value: node.data.volatility.toFixed(1) + '%', active: true },
    { key: text['tooltip.sharpe-ratio'], value: node.data.sharpeRatio.toFixed(1) },
  ];
  const tooltipSize = {
    width: 258,
    height: 121,
    topOffset: node.size,
  };

  const topPosition = () => {
    if (node.y + tooltip.margin.top < tooltipSize.height + tooltipSize.topOffset) {
      return node.y + tooltipSize.topOffset;
    }
    return node.y - tooltipSize.height - tooltipSize.topOffset;
  };

  const leftPosition = () => {
    if (node.x + tooltip.margin.left < tooltipSize.width / 2) {
      return -tooltip.margin.left;
    }
    if (node.x + tooltipSize.width / 2 > tooltip.innerWidth) {
      return tooltip.innerWidth - tooltipSize.width + tooltip.margin.right;
    }
    return node.x - tooltipSize.width / 2;
  };

  return (
    <g transform={`translate(${leftPosition()} ${topPosition()})`}>
      <foreignObject width={tooltipSize.width} height={tooltipSize.height}>
        <Tooltip
          className={cx('tooltip', 'tooltip--fixed-height')}
          heading={node.data.serieId}
          data={tooltipData}
          transparent={false}
          truncateHeading
        />
      </foreignObject>
    </g>
  );
};

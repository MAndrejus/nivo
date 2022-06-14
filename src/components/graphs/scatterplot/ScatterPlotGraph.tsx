import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './scatterplot-graph.module.scss';
import { text } from './text';
import { ResponsiveScatterPlot, ScatterPlotLayerProps } from '@nivo/scatterplot';
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
import { QuestionMarkPopper } from '../../question-mark';
import { NoDataError } from '../../no-data-error';
import {
  ScatterPlotCustomSvgLayer,
  ScatterPlotDatum,
  ScatterPlotLayerId,
  ScatterPlotMouseHandler,
  ScatterPlotRawSerie,
} from '@nivo/scatterplot/dist/types/types';

const cx = classNames.bind(styles);

export interface DotData extends ScatterPlotDatum {
  annualReturns: number;
  volatility: number;
  sharpeRatio: number;
  color?: string;
  icon?: IconType;
  link?: string;
}

export interface ScatterPlotGraphProps {
  data: ScatterPlotRawSerie<DotData>[];
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  axisColors?: string[];
  showQuadrants?: boolean;
  showNodeLabel?: boolean;
  onMouseClick?: ScatterPlotMouseHandler<DotData>;
  setSelectedNodeId?: (id: string | number | null) => void;
  selectedNodeId?: string | number | null;
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

  const [graphNodeId, setGraphNodeId] = useState<string | number | null>(null);

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

  const layers: (ScatterPlotLayerId | ScatterPlotCustomSvgLayer<DotData>)[] = [];
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
    renderTooltip(selectedNodeId ? selectedNodeId : graphNodeId)
  );

  return (
    <div className={cx('graph')}>
      {startDate && (
        <>
          <QuestionMarkPopper
            trigger={'hover'}
            text={text['explanation.annualized-returns'](startDate, disclaimerType)}
            className={cx('explanation', 'explanation--left')}
          />
          <QuestionMarkPopper
            trigger={'hover'}
            text={text['explanation.volatility'](startDate)}
            className={cx('explanation', 'explanation--bottom')}
          />
        </>
      )}

      <ResponsiveScatterPlot
        data={data}
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
        nodeComponent={(dot) =>
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

const renderTooltip = (selectedNodeId?: string | number | null) => {
  const tooltipLayer = (layer: ScatterPlotLayerProps<DotData>) => {
    if (selectedNodeId === null) {
      return null;
    }

    const node = layer.nodes.find((node) => {
      return node.serieId === selectedNodeId;
    });

    if (!node) {
      return null;
    }

    const tooltipData = [
      {
        key: text['tooltip.annual-returns'],
        value: numberWithCommas(node.data.annualReturns) + '%',
      },
      {
        key: text['tooltip.volatility'],
        value: node.data.volatility.toFixed(1) + '%',
        active: true,
      },
      { key: text['tooltip.sharpe-ratio'], value: node.data.sharpeRatio.toFixed(1) },
    ];
    const tooltipSize = {
      width: 258,
      height: 121,
      topOffset: node.size,
    };

    const topPosition = () => {
      if (node.y + layer.margin.top < tooltipSize.height + tooltipSize.topOffset) {
        return node.y + tooltipSize.topOffset;
      }
      return node.y - tooltipSize.height - tooltipSize.topOffset;
    };

    const leftPosition = () => {
      if (node.x + layer.margin.left < tooltipSize.width / 2) {
        return -layer.margin.left;
      }
      if (node.x + tooltipSize.width / 2 > layer.innerWidth) {
        return layer.innerWidth - tooltipSize.width + layer.margin.right;
      }
      return node.x - tooltipSize.width / 2;
    };

    return (
      <g transform={`translate(${leftPosition()} ${topPosition()})`}>
        <foreignObject width={tooltipSize.width} height={tooltipSize.height}>
          <Tooltip
            className={cx('tooltip', 'tooltip--fixed-height')}
            heading={node.serieId}
            data={tooltipData}
            transparent={false}
            truncateHeading
          />
        </foreignObject>
      </g>
    );
  };

  return tooltipLayer;
};

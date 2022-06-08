import { CustomSvgLayer } from '@nivo/scatterplot';
import classNames from 'classnames/bind';
import React, { MouseEvent } from 'react';
import { text } from './text';
import styles from './scatterplot-graph.module.scss';
import { CIRCLE_BLUE, CIRCLE_GREY, GRAPH_LINE_COLOR, legendStyle, tickTextStyle } from './utils';
import { useBreakpointDetector } from 'core/window';
import { DotNode, MouseHandler } from './ScatterPlotGraph';
import { GraphIcon, IconType } from './icons/GraphIcon';

const cx = classNames.bind(styles);

export const YAxisLabels = (data: any) => {
  const isLargeDesktop = useBreakpointDetector({ from: 'large-desktop' });
  return isLargeDesktop ? (
    <g transform={`translate(-60 0)`}>
      <text y={20} style={tickTextStyle}>
        {text.higher}
      </text>
      <text y={data.innerHeight - 20} style={tickTextStyle}>
        {text.lower}
      </text>
    </g>
  ) : (
    <g transform={`translate(0 0)`}>
      <text x={-20} y={-20} style={tickTextStyle}>
        {text.higher}
      </text>
    </g>
  );
};

export const YAxisLegend: CustomSvgLayer = ({ innerHeight }) => {
  const isLargeDesktop = useBreakpointDetector({ from: 'large-desktop' });
  return isLargeDesktop ? (
    <g transform={`translate(-135 ${innerHeight / 2})`}>
      <text style={legendStyle}>{text.annualized}</text>
      <text style={legendStyle} y={15}>
        {text.returns}
      </text>
    </g>
  ) : (
    <g transform={`translate(-14 ${innerHeight / 2 + 20}) rotate(270)`}>
      <text style={legendStyle}>
        <text style={legendStyle}>{text.annualized}</text>
        <text style={legendStyle} y={15}>
          {text.returns}
        </text>
      </text>
    </g>
  );
};

export const XAxisLabels = (data: any) => {
  const isLargeDesktop = useBreakpointDetector({ from: 'large-desktop' });
  return isLargeDesktop ? (
    <g transform={`translate(${0} ${data.innerHeight + 20})`}>
      <text x={10} style={tickTextStyle}>
        {text.lower}
      </text>
      <text x={data.innerWidth - 50} style={tickTextStyle}>
        {text.higher}
      </text>
    </g>
  ) : (
    <g transform={`translate(${0} ${data.innerHeight + 20})`}>
      <text x={-20} style={tickTextStyle}>
        {text.lower}
      </text>
      <text x={data.innerWidth - 50} style={tickTextStyle}>
        {text.higher}
      </text>
    </g>
  );
};

export const YAxisLine: CustomSvgLayer = ({ innerHeight }) => {
  return (
    <g>
      <line x1={0} y1={-10} x2={0} y2={innerHeight} stroke={GRAPH_LINE_COLOR} strokeWidth={1} />
      <line x1={-5} y1={0} x2={0} y2={-10} stroke={GRAPH_LINE_COLOR} strokeWidth={1} />
      <line x1={0} y1={-10} x2={5} y2={0} stroke={GRAPH_LINE_COLOR} strokeWidth={1} />
    </g>
  );
};

export const XAxisLine = (axisColors?: string[]): CustomSvgLayer => ({
  innerWidth,
  innerHeight,
}) => {
  let lineColor: string;
  let defs: JSX.Element | undefined;
  if (axisColors === undefined || axisColors.length === 0) {
    lineColor = GRAPH_LINE_COLOR;
  } else {
    if (axisColors.length === 1) {
      lineColor = axisColors[0];
    } else {
      lineColor = 'url(#xAxisLineGradient)';
      defs = (
        <defs>
          <linearGradient
            id={'xAxisLineGradient'}
            x1={0}
            y1={innerHeight}
            x2={innerWidth + 10}
            y2={innerHeight}
            gradientUnits={'userSpaceOnUse'}
          >
            {axisColors.map((color, index) => {
              const offset = (100 / (axisColors.length - 1)) * index;
              return <stop key={index} offset={offset + '%'} stopColor={color} />;
            })}
          </linearGradient>
        </defs>
      );
    }
  }
  return (
    <g>
      {axisColors && defs}
      <line
        x1={0}
        y1={innerHeight}
        x2={innerWidth + 10}
        y2={innerHeight}
        stroke={lineColor}
        strokeWidth={1}
      />
      <line
        x1={innerWidth}
        y1={innerHeight - 5}
        x2={innerWidth + 10}
        y2={innerHeight}
        stroke={lineColor}
        strokeWidth={1}
      />
      <line
        x1={innerWidth + 10}
        y1={innerHeight}
        x2={innerWidth}
        y2={innerHeight + 5}
        stroke={lineColor}
        strokeWidth={1}
      />
    </g>
  );
};

export const QuadrantsAxis: CustomSvgLayer = ({ innerWidth, innerHeight }) => {
  return (
    <g>
      <line
        x1={innerWidth / 2}
        y1={0}
        x2={innerWidth / 2}
        y2={innerHeight}
        stroke={GRAPH_LINE_COLOR}
        strokeWidth={1}
      />
      <line
        x1={0}
        y1={innerHeight / 2}
        x2={innerWidth}
        y2={innerHeight / 2}
        stroke={GRAPH_LINE_COLOR}
        strokeWidth={1}
      />
    </g>
  );
};

export const NodeRenderer = (
  dot: any,
  maxXValue: number | undefined,
  isMobile: boolean,
  showNodeLabel: boolean,
  setSelectedNodeId?: (id: string | null) => void,
  selectedNodeId?: string | null,
  onClick?: MouseHandler
) => {
  maxXValue = maxXValue ? maxXValue : 0;
  const node = dot.node as DotNode;
  const data = { ...node.data };
  const leftTextPosition = isMobile && node.data.formattedX > maxXValue * 0.5;
  const color = data.color ? data.color : node.index === 0 ? CIRCLE_BLUE : CIRCLE_GREY;
  const icon = data.icon ? data.icon : IconType.circle;
  const isActive = selectedNodeId === node.data.serieId;
  const nodeSize = isActive ? node.size * 0.33 + node.size : node.size;
  const iconClick = onClick ? (event: MouseEvent) => onClick(node, event) : undefined;

  const label = () => {
    return (
      <text
        x={leftTextPosition ? -nodeSize - 5 : nodeSize + 5}
        y={nodeSize / 2}
        textAnchor={leftTextPosition ? 'end' : 'start'}
        className={cx('dot-text')}
      >
        {node.data.serieId}
      </text>
    );
  };

  return (
    <g
      transform={`translate(${node.x} ${node.y})`}
      onMouseEnter={() => setSelectedNodeId && setSelectedNodeId(node.data.serieId)}
      onMouseLeave={() => setSelectedNodeId && setSelectedNodeId(null)}
    >
      <GraphIcon type={icon} size={nodeSize} color={color} active={isActive} onClick={iconClick} />
      {showNodeLabel && label()}
    </g>
  );
};

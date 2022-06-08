import React, { MouseEventHandler } from 'react';

export enum IconType {
  circle = 'circle',
  triangle = 'triangle',
  triangleDown = 'triangleDown',
  square = 'square',
  rhombus = 'rhombus',
}

export interface Point {
  x: number;
  y: number;
}

export interface GraphIconProps {
  type?: IconType;
  color?: string;
  size?: number;
  startingPoint?: Point;
  onClick?: MouseEventHandler;
  active?: boolean;
}

export const GraphIcon: React.FC<GraphIconProps> = ({
  type = IconType.circle,
  color = '#000',
  size = 10,
  startingPoint = { x: 0, y: 0 },
  onClick,
  active,
}) => {
  const activeState = active
    ? { filter: `drop-shadow(0 ${size / 4}px ${size / 10}px #00000030)` }
    : {};
  const onClickState = onClick ? { cursor: 'pointer' } : {};

  const renderCircleIcon = () => {
    return (
      <circle
        r={size / 2}
        cx={startingPoint.x}
        cy={startingPoint.y}
        fill={color}
        onClick={onClick}
        stroke="#ffffff"
        strokeWidth={size / 8}
        style={{ ...activeState, ...onClickState }}
      />
    );
  };

  const renderTriangleIcon = () => {
    const v = size / 2;
    const x1 = v * -1 + startingPoint.x;
    const y1 = v * -1 + startingPoint.y;

    return (
      <g
        transform={`translate(${x1} ${y1}) scale(${size / 10})`}
        style={{ ...activeState, ...onClickState }}
      >
        <path
          d="M4.13397 0.5C4.51887 -0.166667 5.48113 -0.166666 5.86603 0.5L9.33013 6.5C 9.71503 7.16667 9.2339 8 8.4641 8H1.5359C0.766098 8 0.284973 7.16667 0.669873 6.5L 4.13397 0.5Z"
          paintOrder="stroke"
          fill={color}
          stroke="#ffffff"
          strokeWidth="2"
          onClick={onClick}
        />
      </g>
    );
  };

  const renderTriangleDownIcon = () => {
    const v = size / 2;
    const x1 = v * -1 + startingPoint.x;
    const y1 = v * -1 + startingPoint.y;

    return (
      <g
        transform={`translate(${x1} ${y1}) scale(${size / 10})`}
        style={{ ...activeState, ...onClickState }}
      >
        <path
          d="M5.86603 7.5C5.48113 8.16667 4.51887 8.16667 4.13397 7.5L0.669873 1.5C0.284973 0.833334 0.766099 0 1.5359 0H8.4641C9.2339 0 9.71503 0.833333 9.33013 1.5L5.86603 7.5Z"
          paintOrder="stroke"
          fill={color}
          stroke="#ffffff"
          strokeWidth="2"
          onClick={onClick}
        />
      </g>
    );
  };

  const renderSquareIcon = () => {
    const v = size / 2;
    const x1 = v * -1 + startingPoint.x;
    const y1 = v * -1 + startingPoint.y;

    return (
      <rect
        x={x1}
        y={y1}
        width={size}
        height={size}
        fill={color}
        onClick={onClick}
        stroke="#ffffff"
        strokeWidth={1}
        style={{ ...activeState, ...onClickState }}
      />
    );
  };

  const renderRhombusDownIcon = () => {
    const v = size / 2;
    const x1 = v * -1 + startingPoint.x;
    const y1 = v * -1 + startingPoint.y;

    return (
      <g
        transform={`translate(${x1} ${y1}) scale(${size / 10})`}
        style={{ ...activeState, ...onClickState }}
      >
        <path
          d="M4 0L8 5.5L4 11L0 5.5L4 0Z"
          paintOrder="stroke"
          fill={color}
          stroke="#ffffff"
          strokeWidth="2"
          onClick={onClick}
        />
      </g>
    );
  };

  switch (type) {
    case IconType.circle:
      return renderCircleIcon();
    case IconType.triangle:
      return renderTriangleIcon();
    case IconType.triangleDown:
      return renderTriangleDownIcon();
    case IconType.square:
      return renderSquareIcon();
    case IconType.rhombus:
      return renderRhombusDownIcon();
  }
};

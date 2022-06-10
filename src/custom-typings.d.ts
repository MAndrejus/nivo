import {
  ScatterPlotCommonProps,
  ScatterPlotDataProps,
  ScatterPlotDatum,
  ScatterPlotLayerId,
  ScatterPlotNode,
  ScatterPlotNodeData,
} from '@nivo/scatterplot/dist/types/types';
import {
  CartesianMarkerProps,
  CssMixBlendMode,
  Dimensions,
  Margin,
  ModernMotionProps,
} from '@nivo/core';
import { FunctionComponent } from 'react';

declare module '@nivo/scatterplot' {
  export interface ScatterPlotLayerProps<RawDatum extends ScatterPlotDatum> {
    xScale: any;
    yScale: any;
    nodes: ScatterPlotNodeData<RawDatum>[];
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
    margin: Margin;
  }

  export declare type ScatterPlotCustomSvgLayer<RawDatum extends ScatterPlotDatum> =
    FunctionComponent<ScatterPlotLayerProps<RawDatum>>;
  export declare type ScatterPlotCustomCanvasLayer<RawDatum extends ScatterPlotDatum> = (
    ctx: CanvasRenderingContext2D,
    props: ScatterPlotLayerProps<RawDatum>
  ) => void;

  export type ScatterPlotSvgProps<RawDatum extends ScatterPlotDatum> = Partial<
    ScatterPlotCommonProps<RawDatum>
  > &
    ScatterPlotDataProps<RawDatum> &
    Dimensions &
    ModernMotionProps & {
      blendMode?: CssMixBlendMode;
      layers?: (ScatterPlotLayerId | ScatterPlotCustomSvgLayer<RawDatum>)[];
      nodeComponent?: ScatterPlotNode<RawDatum>;
      markers?: CartesianMarkerProps<RawDatum['x'] | RawDatum['y']>[];
    };
}

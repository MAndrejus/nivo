export interface StrategyStatisticsResponse {
  series: string;
  syncDate: string;
  buildingBlockStatistics: Strategy[];
}

export interface Strategy {
  symbol: string;
  printName: string;
  description: string;
  ytdReturn: number;
  volatility: number;
  annualReturns: number;
  maxDrawdown: number;
  cmaExpectedDev: number | null;
  cmaForecastRate: number | null;
  trailing12MoIncomeYield: number;
  trailing12MoDividendYield: number;
  sharpe: number;
}

export enum StrategySeries {
  MULTI_ASSET = 'MULTI_ASSET',
  QUANTITATIVE = 'QUANTITATIVE',
  ESG = 'ESG',
  DSP = 'DSP',
  DSP_TAX_SENSITIVE = 'DSP_TAX_SENSITIVE',
}

export interface StrategyTable {
  name: string;
  symbol: string;
  volatility: string | number;
  sharpe: string | number;
  ytdReturns: string | number;
  trailing12MoIncomeYield: string | number;
  maxDrawdown: string | number;
}

export interface CurrentStrategy {
  symbol: string;
  series: string;
  printName: string;
  description?: string;
  tagline?: string;
  benchmark?: string;
  objective?: string;
}

export interface ColumnsWidths {
  name?: number;
  volatility?: number;
  sharpe?: number;
  ytdReturns?: number;
  trailing12MoIncomeYield?: number;
  maxDrawdown?: number;
  pdf?: number;
}

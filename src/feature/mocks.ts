import { StrategyStatisticsResponse } from './types';
import moment from 'moment';

export const multiAssetStrategies: StrategyStatisticsResponse = {
  series: 'MULTI_ASSET',
  syncDate: '2022-06-05',
  buildingBlockStatistics: [
    {
      symbol: 'NTAMSRSRiskControlF_BA',
      printName: 'NT Strategic Risk Control',
      description: 'Lorem ipsum dolor sit',
      ytdReturn: -4.61,
      volatility: 3.5,
      annualReturns: -2.76,
      maxDrawdown: -5.96,
      cmaExpectedDev: null,
      cmaForecastRate: null,
      trailing12MoIncomeYield: 2.14,
      trailing12MoDividendYield: 0.02,
      sharpe: -1.08,
    },
  ],
};

export const quantitativeStrategies: StrategyStatisticsResponse = {
  series: 'QUANTITATIVE',
  syncDate: '2022-06-05',
  buildingBlockStatistics: [
    {
      symbol: 'NTGlobalDynamicFactorsMLMF_BA',
      printName: 'NT Global Dynamic Factor Machine Learning',
      description: 'Lorem ipsum dolor sit',
      ytdReturn: -10.24,
      volatility: 15.33,
      annualReturns: 9.87,
      maxDrawdown: -48.89,
      cmaExpectedDev: null,
      cmaForecastRate: null,
      trailing12MoIncomeYield: 1.68,
      trailing12MoDividendYield: 0.02,
      sharpe: 0.58,
    },
    {
      symbol: 'NTAMQualityFocusGrowthF_BA',
      printName: 'NT Quality Focus Growth',
      description: 'Lorem ipsum dolor sit',
      ytdReturn: -16.13,
      volatility: 24.42,
      annualReturns: -32.81,
      maxDrawdown: -17.83,
      cmaExpectedDev: null,
      cmaForecastRate: null,
      trailing12MoIncomeYield: 0.79,
      trailing12MoDividendYield: 0.01,
      sharpe: -1.38,
    },
  ],
};

const strategiesDataMapper = (data: StrategyStatisticsResponse) => {
  return {
    syncDate: moment(data.syncDate, 'YYYY-MM-DD').format('MM/DD/YYYY'),
    data: data.buildingBlockStatistics,
    isLoading: false,
  };
};

export const multiAssetMappedData = strategiesDataMapper(multiAssetStrategies);
export const quantitativeMappedData = strategiesDataMapper(quantitativeStrategies);

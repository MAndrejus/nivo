export const text = {
  lower: 'Lower',
  higher: 'Higher',
  'potential-returns': 'Annualized Return',
  annualized: 'Annualized',
  return: 'Return',
  potential: 'Potential',
  returns: 'Return',
  'expected-risk': 'Volatility',
  'expected-risk.tooltip': 'Volatility',
  'tooltip.annual-returns': 'Annual Returns (YTD)',
  'tooltip.volatility': 'Volatility',
  'tooltip.sharpe-ratio': 'Sharpe Ratio',
  'explanation.annualized-returns': (startDate: string, type?: string) =>
    `These ${type} net performance returns are calculated since the start date of ${startDate} and are annualized for representation.`,
  'explanation.volatility': (startDate: string) =>
    `This is the standard deviation of the portfolio since the start date of ${startDate} and are annualized for representation.`,
};

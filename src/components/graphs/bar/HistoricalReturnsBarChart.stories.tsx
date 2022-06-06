import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HistoricalReturnsBarChart, Props } from './HistoricalReturnsBarChart';

export default {
  title: 'Graphs/Historical Returns Bar Chart',
  component: HistoricalReturnsBarChart,
  decorators: [
    (Story) => (
      <div style={{ width: '900px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <HistoricalReturnsBarChart {...args} />;

export const ChartWithData = Template.bind({});
ChartWithData.args = {
  data: [
    { date: '2010', value: 10 },
    { date: '2011', value: 15 },
    { date: '2012', value: 22 },
    { date: '2013', value: -5 },
    { date: '2014', value: -15 },
    { date: '2015', value: 12 },
  ],
};

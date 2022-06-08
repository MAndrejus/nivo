import React from 'react';
import { generateSingleComponentDocsPage } from 'core/storybook';
import { Meta } from '@storybook/react';

import { config } from './config';
import { Icon, IconProps } from './Icon';

export default {
  title: 'Style Guide/Icons',
  component: Icon,
} as Meta;

export const Basic = (args: IconProps) => {
  return (
    <div>
      <Icon {...args} />
    </div>
  );
};

export const AllIcons = (args: IconProps) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', margin: -16 }}>
      {Object.keys(config).map((icon, index) => {
        console.log(icon);
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 16,
              padding: 20,
              width: args.size,
              alignItems: 'center',
            }}
            key={index}
          >
            <Icon {...args} name={icon as keyof typeof config} />
            <h4>{icon}</h4>
          </div>
        );
      })}
    </div>
  );
};

const parameters = {
  docs: {
    page: generateSingleComponentDocsPage({
      heading: 'Icon',
    }),
  },
};

const args = {
  size: 30,
  className: '',
  name: 'x-lean',
};

Basic.parameters = parameters;
Basic.args = args;

AllIcons.parameters = parameters;
AllIcons.args = args;

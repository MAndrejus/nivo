import React from 'react';
import { Button, ButtonProps } from './Button';

export const DangerButton = (props: Omit<ButtonProps, 'variant'>) => {
  return <Button {...props} variant={'danger'} />;
};

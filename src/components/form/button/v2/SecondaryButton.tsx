import React from 'react';
import { Button, ButtonProps } from './Button';

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => {
  return <Button {...props} variant={'secondary'} />;
};

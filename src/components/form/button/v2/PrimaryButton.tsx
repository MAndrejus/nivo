import React from 'react';
import { Button, ButtonProps } from './Button';

export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => {
  return <Button {...props} variant={'primary'} />;
};

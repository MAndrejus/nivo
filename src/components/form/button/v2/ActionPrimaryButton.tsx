import React from 'react';
import { Button, ButtonProps } from './Button';

export const ActionPrimaryButton = (props: Omit<ButtonProps, 'variant'>) => {
  return <Button {...props} variant={'action-primary'} />;
};

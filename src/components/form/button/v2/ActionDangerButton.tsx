import React from 'react';
import { Button, ButtonProps } from './Button';

export const ActionDangerButton = (props: Omit<ButtonProps, 'variant'>) => {
  return <Button {...props} variant={'action-danger'} />;
};

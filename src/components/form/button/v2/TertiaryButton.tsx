import React from 'react';
import { Button, ButtonProps } from './Button';

export const TertiaryButton = (props: Omit<ButtonProps, 'variant'>) => {
  return <Button {...props} variant={'tertiary'} />;
};

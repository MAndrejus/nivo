import React from 'react';
import { Button, ButtonProps } from './Button';

export const LinkPrimaryButton = (props: Omit<ButtonProps, 'variant'>) => {
  return <Button {...props} variant={'link-primary'} />;
};

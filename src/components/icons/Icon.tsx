import classNames from 'classnames/bind';
import React from 'react';
import { config } from './config';
import styles from './icon.module.scss';

const cx = classNames.bind(styles);

export interface IconProps {
  size: number;
  height?: number;
  name: keyof typeof config;
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ size, name, height, className, onClick }) => {
  const IconComponent = config[name];
  const tempClass = `icon--${name}`;
  const defaultStylingClass = cx(tempClass) === tempClass ? '' : cx(tempClass);

  return (
    <IconComponent
      onClick={onClick}
      width={size}
      height={height || size}
      className={classNames(className, defaultStylingClass)}
    />
  );
};

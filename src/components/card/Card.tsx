import React, { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './card.module.scss';

const cx = classNames.bind(styles);

interface CardProps {
  children: ReactNode;
  noBackground?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

export const Card = ({ children, noBackground, onClick, style, className }: CardProps) => {
  return (
    <div
      className={cx(
        'card',
        noBackground && 'card--transparent',
        onClick && 'card--clickable',
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

import React from 'react';
import styles from './box.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  children: JSX.Element;
}

export const Box = ({ children }: Props) => {
  return <div className={cx('box')}>{children}</div>;
};

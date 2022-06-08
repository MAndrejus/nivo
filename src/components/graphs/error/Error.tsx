import React from 'react';
import classNames from 'classnames/bind';
import styles from './error.module.scss';
import { text } from './text';

const cx = classNames.bind(styles);

interface ErrorProps {
  message?: string;
  className?: string;
}
export const Error = (props: ErrorProps) => {
  const { message, className } = props;
  return (
    <div className={cx('container', className)}>
      <h6 className={cx('message')}>{message || text['message']}</h6>
    </div>
  );
};

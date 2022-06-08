import React from 'react';
import classNames from 'classnames/bind';
import styles from './no-data-error.module.scss';
import { text } from './text';

const cx = classNames.bind(styles);

export interface DataLoadingErrorProps {
  className?: string;
  message?: string;
}

export const NoDataError = (props: DataLoadingErrorProps) => {
  const { className, message } = props;
  return <div className={cx('error', className)}>{message || text['no-data']}</div>;
};

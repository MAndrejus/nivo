import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './tooltip.module.scss';
import { MOBILE_BREAKPOINT } from '../../../core/utils';

const cx = classNames.bind(styles);

interface DataItem {
  key: string | number;
  value: string | number;
  bold?: boolean;
  active?: boolean;
}

interface Props {
  className?: string;
  heading: string | number;
  data: DataItem[];
  transparent?: boolean;
  truncateHeading?: boolean;
}

export const Tooltip = (props: Props) => {
  const { heading, data, className, transparent = false, truncateHeading } = props;
  const node = useRef<HTMLDivElement | null>(null);

  const style: { [key: string]: string } = {};
  if (window.innerWidth <= MOBILE_BREAKPOINT && node?.current?.parentElement) {
    const parent = node.current.parentElement;
    const offsetX = parseFloat(parent.style.transform.split('(')[1].split('px')[0]);
    if (offsetX < -40) parent.style.transform = `translate(20px, 0)`;
    if (offsetX > 100) parent.style.transform = `translate(20px, 0)`;
  }

  const list = data.map((item, i) => {
    return (
      <p className={cx('item', item.active && 'item--active', item.bold && 'item--bold')} key={i}>
        {item.key} <span>{item.value}</span>
      </p>
    );
  });
  return (
    <div className={cx('tooltip', transparent && 'transparent', className)} style={style}>
      <h6 className={cx('heading', truncateHeading && 'heading--truncate')}>{heading}</h6>
      {list}
    </div>
  );
};

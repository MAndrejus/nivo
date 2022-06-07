import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './line-graph.module.scss';
import { MOBILE_BREAKPOINT, numberWithCommas } from 'core/utils';
import { text } from './text';

const cx = classNames.bind(styles);

interface DataItem {
  key: string | number;
  min?: number;
  max?: number;
  value: string | number;
  unit: string;
  bold?: boolean;
  active?: boolean;
  withColors?: boolean;
  color?: string;
}
interface Props {
  className?: string;
  unitsPosition?: 'start' | 'end';
  heading: string | number;
  data: DataItem[];
  units: '%' | '$';
  withColors?: boolean;
}
export const Tooltip = (props: Props) => {
  const { heading, data, className, unitsPosition, withColors, units } = props;
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
      <div key={i}>
        {item.max && (
          <p className={cx('item', item.active && 'item--active', item.bold && 'item--bold')}>
            {text['graph.tooltip.top-performance']}
            <span className={cx('value')}>
              {unitsPosition === 'start' ? units : ''}
              {numberWithCommas(item.max)}
              {unitsPosition === 'end' ? units : ''}
            </span>
          </p>
        )}
        <p
          className={cx(
            'item',
            item.max && 'item--active',
            item.active && 'item--active',
            item.bold && 'item--bold'
          )}
        >
          {withColors && <div className={cx('dot')} style={{ background: item.color }} />}
          <span className={cx('key')}>{item.key}</span>
          <span className={cx('value')}>
            {unitsPosition === 'start' ? units : ''}
            {item.value}
            {unitsPosition === 'end' ? units : ''}
          </span>
        </p>
        {item.min && (
          <p className={cx('item', item.active && 'item--active', item.bold && 'item--bold')}>
            {text['graph.tooltip.bottom-performance']}
            <span className={cx('value')}>
              {unitsPosition === 'start' ? units : ''}
              {numberWithCommas(item.min)}
              {unitsPosition === 'end' ? units : ''}
            </span>
          </p>
        )}
      </div>
    );
  });
  return (
    <div className={cx('tooltip', className)} style={style}>
      <h6 className={cx('heading')}>{heading}</h6>
      {list}
    </div>
  );
};

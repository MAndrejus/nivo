import React, { useState } from 'react';
import styles from './assets-pie-chart.module.scss';
import classNames from 'classnames/bind';
import { text } from './text';
import { ResponsivePie } from '@nivo/pie';
import { Tooltip } from './Tooltip';
import { colorsPalette } from 'core/colors';

const cx = classNames.bind(styles);

export interface AssetsGraphProps {
  data: { name: string; value: number }[];
  className?: string;
  isColumnView?: boolean;
  showNoDataText?: boolean;
}

export const AssetsPieChart = (props: AssetsGraphProps) => {
  let { className, data, isColumnView, showNoDataText = true } = props;

  // Define witch pie part is currently hovered (used color as we dont have ids on svg paths)
  const [activePart, setActive] = useState<string | number>('');

  const dataWithColors = data.map((item, i) => ({ ...item, color: colorsPalette[i] || '#666666' }));
  const total = Math.round(data.reduce((total, a) => total + a.value * 100, 0));

  const emptyChart = [{ id: 'empty', value: 1 }];

  const chartData = dataWithColors
    .filter((item) => item.value >= 0.0005)
    .map((item) => {
      return {
        ...item,
        id: item.name,
        value: item.value < 0.02 ? 0.02 : item.value,
      };
    });

  const listOfValues = dataWithColors.map((part, i) => {
    // Blur all non hovered values from the list
    let { value, name, color } = part;
    value = Math.round(value * 1000) / 10;
    const opacity = activePart && color !== activePart ? 0.35 : 1;

    let formattedValue = '';
    if (value < 0.1 && value > -0.1) formattedValue = '0%';
    if (value >= 0.1) formattedValue = value.toFixed(1) + '%';
    if (value <= -0.1) formattedValue = value.toFixed(1) + '%';

    return (
      <li className={cx('row')} key={i} style={{ opacity }}>
        <span className={cx('dot')} style={{ backgroundColor: color }} />
        <span className={cx('label')}>{name || text['value.undefined']}</span>{' '}
        <span className={cx('value', value >= 0.1 && 'value--bold')}>{formattedValue}</span>
      </li>
    );
  });

  const hideTooltip = (color: string | number) => {
    const paths = Array.from(document.querySelectorAll<HTMLElement>('#risk-graph path'));
    setActive(color);
    paths.forEach((path) => {
      const pathColor = path.getAttributeNS(null, 'fill');
      if (pathColor !== color) {
        path.style.opacity = '0.35';
      }
    });
  };

  const showTooltip = () => {
    const paths = Array.from(document.querySelectorAll<HTMLElement>('#risk-graph path'));
    paths.forEach((path) => (path.style.opacity = '1'));
    setActive('');
  };

  return (
    <div className={cx('container', className, isColumnView && 'chart-in-column')}>
      <div className={cx('graph')} id="risk-graph">
        {!total && showNoDataText && <div className={cx('no-data')}>{text['no-data']}</div>}
        <ResponsivePie
          borderColor="rgba(0,0,0,0.0)"
          data={total ? chartData : emptyChart}
          onMouseEnter={(e) => hideTooltip(e.color)}
          onMouseLeave={showTooltip}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          innerRadius={0.88}
          padAngle={4}
          // enableRadialLabels={false}
          cornerRadius={0}
          colors={total ? chartData.map((item) => item.color) : ['#f5f5f5']}
          tooltip={Tooltip}
          // enableSliceLabels={false}
        />
      </div>
      <div className={cx('details')}>
        {!isColumnView && (
          <h4 className={cx('details-title')}>
            {text['details.title']}{' '}
            <span className={cx('total')}>{total === 100 ? total.toFixed(1) + '%' : ''}</span>
          </h4>
        )}
        <ul className={cx('list')}>{listOfValues}</ul>
      </div>
    </div>
  );
};

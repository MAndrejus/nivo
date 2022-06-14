import React from 'react';
import { Palette as PaletteI, PaletteColor } from './colors/types';
import classNames from 'classnames/bind';
import styles from './palette.module.scss';

const cx = classNames.bind(styles);

interface PaletteProps {
  palette: PaletteI;
}

const renderColor = (color: PaletteColor) => {
  return (
    <div
      key={color.symbol}
      className={cx('color', color.darkText && 'color--dark-text')}
      style={{ backgroundColor: color.value }}
    >
      <div className={cx('color__symbol')}>{color.symbol}</div>
      <div className={cx('color__value')}>
        {color.value}
        {color.note && ` - ${color.note}`}
      </div>
    </div>
  );
};

export const Palette = ({ palette }: PaletteProps) => {
  return (
    <div className={cx('palette')}>
      <h2 className={cx('palette__title')}>{palette.title}</h2>
      <div className={cx('palette__colors')}>
        <div className={cx('palette__colors-group')}>
          {palette.colors.map((color) => renderColor(color))}
        </div>
        {palette.additionalColors && (
          <div className={cx('palette__colors-group')}>
            {palette.additionalColors.map((color) => renderColor(color))}
          </div>
        )}
      </div>
    </div>
  );
};

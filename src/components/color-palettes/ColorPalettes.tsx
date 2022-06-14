import React from 'react';
import { Palette } from './Palette';
import classNames from 'classnames/bind';
import styles from './color-palettes.module.scss';
import {
  AquaPalette,
  BluePalette,
  DarkGreenPalette,
  GreenPalette,
  GreyPalette,
  LightGreenPalette,
  NTGoldPalette,
  NTGreenPalette,
  NTWarmGreyPalette,
  OrangePalette,
  PurplePalette,
  RedPalette,
  TealPalette,
  YellowPalette,
} from './colors';
import { Box } from '../box';

const cx = classNames.bind(styles);

export const ColorPalettes = () => {
  return (
    <>
      <Box>
        <div className={cx('palettes-wrapper')}>
          <h1 className={cx('palettes-wrapper__title')}>Core Color Palettes</h1>
          <div className={cx('palettes-wrapper__description')}>
            General color palatte combining DDS with Emotomy colors.
          </div>
          <div className={cx('palettes')}>
            <Palette palette={GreyPalette} />
            <Palette palette={BluePalette} />
            <Palette palette={AquaPalette} />
            <Palette palette={TealPalette} />
            <Palette palette={DarkGreenPalette} />
            <Palette palette={GreenPalette} />
            <Palette palette={LightGreenPalette} />
            <Palette palette={YellowPalette} />
            <Palette palette={PurplePalette} />
            <Palette palette={RedPalette} />
            <Palette palette={OrangePalette} />
          </div>
        </div>
      </Box>
      <Box>
        <div className={cx('palettes-wrapper')}>
          <h1 className={cx('palettes-wrapper__title')}>Additional Color Palettes</h1>
          <div className={cx('palettes-wrapper__description')}>
            Use this space and artbard to expand on colors not previously defined.
          </div>
          <div className={cx('palettes')}>
            <Palette palette={NTGreenPalette} />
            <Palette palette={NTGoldPalette} />
            <Palette palette={NTWarmGreyPalette} />
          </div>
        </div>
      </Box>
    </>
  );
};

import classNames from 'classnames/bind';
import React, { ComponentProps } from 'react';
import Popup from 'reactjs-popup';
import styles from './tooltip.module.scss';

export interface TooltipProps extends ComponentProps<typeof Popup> {}

export type TooltipPosition =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'right top'
  | 'right center'
  | 'right bottom'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left center'
  | 'left bottom'
  | 'center center';

const cx = classNames.bind(styles);

/**
 * @deprecated instead use components/tooltip/TooltipPopper.tsx
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  position = 'top center',
  on = 'hover',
  arrow = false,
  ...restProps
}) => {
  const props = {
    keepTooltipInside: true,
    ...restProps,
  };
  return (
    <Popup {...props} on={on} position={position} arrow={arrow}>
      <div className={cx('body', props.className)}>{children}</div>
    </Popup>
  );
};

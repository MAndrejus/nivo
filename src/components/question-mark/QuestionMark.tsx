import React from 'react';
import { Icon, IconProps } from '../icons';
import { Tooltip, TooltipPosition } from '../tooltip';
import classNames from 'classnames/bind';
import styles from './question-mark.module.scss';

export type Position = TooltipPosition | TooltipPosition[] | 'label' | 'table-heading';

const cx = classNames.bind(styles);

const getPosition = (tooltipPosition: Position = []): TooltipPosition[] | TooltipPosition => {
  if (tooltipPosition === 'label') {
    return ['top center', 'top left', 'top right', 'right center', 'left center'];
  }

  if (tooltipPosition === 'table-heading') {
    return ['bottom center', 'bottom right', 'bottom left'];
  }

  return tooltipPosition;
};

type IconName = Pick<IconProps, 'name'>;

interface QuestionMarkProps {
  text?: string;
  itemList?: string[];
  className?: string;
  classNameBody?: string;
  keepTooltipInside?: string;
  tooltipPosition?: Position;
  on?: 'click' | 'focus' | 'hover';
  contentStyle?: React.CSSProperties;
  icon?: IconName['name'];
}
export const QuestionMark: React.FC<QuestionMarkProps> = ({
  children,
  text,
  itemList,
  className,
  on = 'click',
  tooltipPosition,
  keepTooltipInside,
  contentStyle,
  classNameBody,
  icon = 'tooltip-trigger',
}) => {
  return (
    <Tooltip
      trigger={
        <span
          aria-label="Click to open a tooltip"
          className={cx('tooltip-trigger-button', className)}
        >
          <Icon name={icon} size={18} />
        </span>
      }
      on={on}
      position={getPosition(tooltipPosition)}
      keepTooltipInside={keepTooltipInside}
      contentStyle={contentStyle}
      className={classNameBody}
    >
      <div className={cx('tooltip-content')}>
        {!children && <p>{text}</p>}
        {children && children}
        {itemList && (
          <ul>
            {itemList.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        )}
      </div>
    </Tooltip>
  );
};

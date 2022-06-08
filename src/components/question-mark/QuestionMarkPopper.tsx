import React from 'react';
import { TooltipPopper, TooltipPopperProps } from '../tooltip';
import styles from './question-mark-popper.module.scss';
import classNames from 'classnames/bind';
import { Icon, IconProps } from '../icons';

const cx = classNames.bind(styles);

type IconName = Pick<IconProps, 'name'>;

interface QuestionMarkPopperProps extends TooltipPopperProps {
  text?: string;
  side?: 'left' | 'right';
  icon?: IconName['name'];
  iconSize?: number;
}

type QuestionMarkPopperType = Omit<QuestionMarkPopperProps, 'containerSupplier'>;

export const QuestionMarkPopper: React.FC<QuestionMarkPopperType> = ({
  children,
  text,
  side = 'right',
  icon = 'tooltip-trigger',
  iconSize = 18,
  trigger = 'click',
  offset = [0, 6],
  className,
  ...rest
}) => {
  const triggerElement = (ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => (
    <span
      className={cx(
        'question-mark',
        side === 'left' ? 'question-mark--left' : 'question-mark--right',
        className
      )}
      ref={ref}
    >
      <Icon size={iconSize} name={icon} className={cx('question-mark__icon')} />
    </span>
  );

  return (
    <>
      <TooltipPopper
        {...rest}
        containerSupplier={triggerElement}
        trigger={trigger}
        offset={offset}
        className={cx('tooltip-container')}
      >
        {!children && <p>{text}</p>}
        {children && children}
      </TooltipPopper>
    </>
  );
};

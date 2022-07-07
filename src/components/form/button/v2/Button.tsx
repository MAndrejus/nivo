import React, { createElement, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.scss';
import { Icon, IconProps } from '../../../icons';

const cx = classNames.bind(styles);

type ButtonTypes = 'submit' | 'reset' | 'button';
type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'action-primary'
  | 'action-danger'
  | 'link-primary';

type IconType = Omit<IconProps, 'onClick' | 'height' | 'size'>;
interface ButtonIcon extends IconType {
  size?: number;
}

const renderIcon = (icon: ButtonIcon) => (
  <Icon name={icon.name} size={icon?.size || 16} className={icon.className} />
);

export interface ButtonProps {
  children?: ReactNode;
  title?: string;
  type?: ButtonTypes;
  variant?: ButtonVariants;
  disabled?: boolean;
  iconRight?: ButtonIcon;
  iconLeft?: ButtonIcon;
  onClick?: MouseEventHandler<HTMLButtonElement> | MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  tag?: 'button' | 'a';
  className?: string;
  target?: string;
  testId?: string;
}

export const Button = ({
  children,
  title,
  type = 'button',
  variant = 'primary',
  disabled = false,
  iconRight,
  iconLeft,
  onClick,
  href,
  tag = href ? 'a' : 'button',
  className,
  target,
  testId,
}: ButtonProps) => {
  const isButton = tag === 'button';

  return createElement(
    tag,
    {
      title,
      href,
      type: (isButton && type) || undefined,
      disabled: isButton && disabled,
      tabIndex: (!isButton && disabled && '-1') || undefined,
      className: cx(
        'button',
        `button--${variant}`,
        !children && 'button--icon',
        disabled && 'button--disabled',
        className
      ),
      onClick: isButton ? onClick : disabled ? (event: Event) => event.preventDefault() : onClick,
      target,
      'data-testid': testId,
    },
    <span className={cx('button__body')}>
      {iconLeft && <span className={cx('icon', 'icon--left')}>{renderIcon(iconLeft)}</span>}
      {children && <span className={cx('content')}>{children}</span>}
      {iconRight && <span className={cx('icon', 'icon--right')}>{renderIcon(iconRight)}</span>}
    </span>
  );
};

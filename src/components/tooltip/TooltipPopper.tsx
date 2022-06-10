import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Config, TriggerType, usePopperTooltip } from 'react-popper-tooltip';
import styles from './tooltip-popper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export type TooltipPopperPlacements = Config['placement'];
export type TooltipPopperTriggers = TriggerType;

export interface TooltipPopperProps {
  containerSupplier: (ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => JSX.Element;
  text?: string;
  trigger?: TooltipPopperTriggers;
  isPortal?: boolean;
  portal?: Element;
  placement?: TooltipPopperPlacements;
  offset?: [number, number];
  arrow?: boolean;
  className?: string;
}

export const TooltipPopper: React.FC<TooltipPopperProps> = ({
  children,
  containerSupplier,
  text,
  trigger = 'hover',
  isPortal = false,
  portal = document.body,
  placement = 'top',
  offset = [0, 6],
  arrow = false,
  className,
}) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      trigger,
      placement,
      offset,
    });

  const renderTooltip = () => {
    return (
      <div
        ref={setTooltipRef}
        {...getTooltipProps({ className: cx('tooltip-container', className) })}
      >
        <div className={cx('tooltip-container__body')}>
          {!children && <p>{text}</p>}
          {children && children}
        </div>
        {arrow && <div {...getArrowProps({ className: cx('tooltip-arrow') })} />}
      </div>
    );
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'));
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      {containerSupplier(setTriggerRef)}
      {visible && (isPortal ? ReactDOM.createPortal(renderTooltip(), portal) : renderTooltip())}
    </>
  );
};

import React from 'react';
import styles from './checkbox.module.scss';
import classNames from 'classnames/bind';

export const cx = classNames.bind(styles);

export interface CheckboxProps {
  className?: string;
  classNameCheckbox?: string;
  id?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  indeterminate?: boolean | string;
  disabled?: boolean;
  label?: string;
  name?: string;
  onBlur?: any;
  testId?: string;
  showCheckedClassName?: boolean;
}

/**
 * @deprecated instead use components/form/checkbox/v2/Checkbox.tsx
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className,
  classNameCheckbox,
  id,
  onChange,
  checked,
  disabled,
  label,
  name,
  onBlur,
  testId,
  showCheckedClassName,
  ...otherProps
}) => {
  if (otherProps.indeterminate !== undefined) {
    otherProps.indeterminate = otherProps.indeterminate.toString();
  }

  const showLabel = (label?: string) => {
    if (label) {
      return <span className={cx('checkbox__label')}>{label}</span>;
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={cx('checkbox', className, showCheckedClassName && 'checkbox--checked')}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className={cx('checkbox__input')}
          disabled={disabled}
          onBlur={() => onBlur && onBlur()}
          data-testid={testId}
        />
        <span className={cx('checkbox__fake', classNameCheckbox)}>{showLabel(label)}</span>
        {children}
      </label>
    </>
  );
};

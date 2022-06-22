import React from 'react';
import { Box } from '../box';
import classNames from 'classnames/bind';
import styles from './typography.module.scss';

const cx = classNames.bind(styles);

export type TypographyStyling =
  | 'headline-xxl'
  | 'sub-headline-xxl'
  | 'headline-xl'
  | 'sub-headline-xl'
  | 'headline-lg'
  | 'sub-headline-lg'
  | 'headline-md'
  | 'headline-sm'
  | 'headline-xs'
  | 'text-xl'
  | 'text-lg'
  | 'text-md'
  | 'text-sm'
  | 'text-xs'
  | 'text-link';

export interface TypographyUsageI {
  name: string;
  font: string;
  style: string;
  availability: string;
  useCase: string;
  className: TypographyStyling;
}

interface TypographyGuidelineProps {
  typographiesUsage: TypographyUsageI[];
  title: string;
  type?: 'desktop' | 'mobile';
}

const exampleText = 'Powerful Technology. Powerful Investing. [Em]Powering Your Advantage.';

export const TypographyGuideline = ({
  typographiesUsage,
  title,
  type = 'desktop',
}: TypographyGuidelineProps) => {
  return (
    <Box>
      <div className={cx('typography')}>
        <h1>{title}</h1>
        <table className={cx('table', type === 'mobile' && 'table--mobile')}>
          <thead>
            <tr>
              <th className={cx('table__example')}>Example</th>
              <th className={cx('table__name')}>Style name</th>
              <th className={cx('table__size')}>Size / Line height</th>
              <th className={cx('table__styling')}>Styling</th>
              <th className={cx('table__availability')}>Availability</th>
              <th className={cx('table__use-case')}>Use case</th>
            </tr>
          </thead>
          <tbody>
            {typographiesUsage.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div
                      className={cx(
                        item.className,
                        type === 'mobile' && `${item.className}--mobile`
                      )}
                    >
                      {exampleText} <a className={cx('text-link')}>Link test</a>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.font}</td>
                  <td className={cx('pre-line')}>{item.style}</td>
                  <td className={cx('pre-line')}>{item.availability}</td>
                  <td>{item.useCase}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

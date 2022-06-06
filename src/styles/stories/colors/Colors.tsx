import React from 'react';
import classNames from 'classnames/bind';
import styles from './colors.module.scss';

const cx = classNames.bind(styles);

interface Color {
  title: string;
  colors: Array<any>;
}
export interface ColorsProps {
  colorGroups: Color[];
}

export const Colors = (props: ColorsProps) => {
  const { colorGroups } = props;
  return colorGroups.map((group, i) => {
    return (
      <div className={styles.styleguideColors} key={i}>
        <h3 className={styles.styleguideColorsTitle}>{group.title}</h3>
        {group.colors.map((color) => (
          <div
            className={cx(
              styles.styleguideColorsColor,
              color.isLight && 'styleguide-colors-color--light'
            )}
          >
            <div style={{ background: color.color }} className={styles.styleguideColorsBubble}>
              <div className={styles.styleguideColorsVariable}>
                <div>{color.variable}</div>
                <div className={styles.styleguideColorsVariableColor}>{color.color}</div>
              </div>
            </div>
            <div className={styles.styleguideColorsUsages}>
              {color.usages.map((usage: any) => (
                <div className={styles.styleguideColorsUsage}>{usage}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  });
};

import React from 'react';
import { Card } from '../../components/card';
import classNames from 'classnames/bind';
import styles from './cards-layout.module.scss';

const cx = classNames.bind(styles);

export const CardsLayout = () => {
  return (
    <div className={'layout'}>
      <Card>Default Card</Card>
      <Card noBackground>Without Background Card</Card>
      <div className={cx('cards')}>
        {[...Array(7)].map((element, i) => {
          return i === 1 || i === 3 ? (
            <Card key={i} onClick={() => console.log('clicked')}>
              Clickable Card
            </Card>
          ) : i === 6 ? (
            <Card key={i} noBackground>
              Card Without Background
            </Card>
          ) : (
            <Card key={i}>Card</Card>
          );
        })}
      </div>
    </div>
  );
};

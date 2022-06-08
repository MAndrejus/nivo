import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './loader.module.scss';
import ContentLoader from 'react-content-loader';

const cx = classNames.bind(styles);

interface LoaderProps {
  className?: string;
  type?: 'two-lines' | 'three-lines';
}
export const Loader = (props: LoaderProps) => {
  const { className, type } = props;
  const [width, setWidth] = useState(0);
  const node = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (node.current?.offsetWidth) {
      setWidth(node.current.offsetWidth);
    }
  }, [node]);
  if (type === 'three-lines') {
    return (
      <div className={cx('container', className)} ref={node}>
        <ContentLoader backgroundColor="#d8d8d8" viewBox={`0 0 ${width} 64`}>
          <rect x="0" y="0" rx="4" ry="0" width={width * 0.8} height="16" />
          <rect x="0" y="23" rx="3" ry="0" width={width} height="16" />
          <rect x="0" y="46" rx="3" ry="0" width={width} height="16" />
        </ContentLoader>
      </div>
    );
  }
  if (type === 'two-lines') {
    return (
      <div className={cx('container', className)} ref={node}>
        <ContentLoader backgroundColor="#d8d8d8" viewBox={`0 0 ${width} 64`}>
          <rect x="0" y="0" rx="4" ry="0" width={width * 0.6} height="16" />
          <rect x="0" y="23" rx="3" ry="0" width={width} height="16" />
        </ContentLoader>
      </div>
    );
  }
  return null;
};

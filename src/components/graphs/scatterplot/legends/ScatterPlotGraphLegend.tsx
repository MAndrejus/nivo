import React, { CSSProperties } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './scatterplot-graph-legends.module.scss';
import { Checkbox } from '../../../form';
import { GraphIcon, IconType } from '../icons/GraphIcon';

const cx = classNames.bind(styles);

export interface Node {
  label: string;
  icon: IconType;
  color: string;
  link: string;
  linkTarget?: '_blank' | '_self' | '_parent' | '_top' | string;
}

export interface Filter {
  name: string;
  checked: boolean;
  handler: React.ChangeEventHandler<HTMLInputElement>;
}

export interface NodeGroup {
  name: string;
  filters: Filter[];
  node: Node[];
  columns: number;
}

export interface ScatterPlotGraphLegendProps {
  className?: string;
  style?: CSSProperties;
  nodeGroups: NodeGroup[];
  selectedNodeId?: string | number | null;
  setSelectedNodeId?: (id: string | number | null) => void;
  testId?: string;
}

export const ScatterPlotGraphLegend: React.FC<ScatterPlotGraphLegendProps> = ({
  className,
  style,
  nodeGroups,
  selectedNodeId,
  setSelectedNodeId,
  testId,
}) => {
  const legendColumns = (group: NodeGroup) => {
    const columns = group.columns;
    const totalNodes = group.node.length;
    const itemsInColumn = Math.ceil(totalNodes / columns);
    const elements: JSX.Element[] = [];

    const renderLabel = (node: Node, isActive: boolean) => {
      if (node.link) {
        return (
          <Link
            className={cx('link', isActive && 'link--active')}
            tabIndex={1}
            target={node.linkTarget && node.linkTarget}
            to={node.link || ''}
            onMouseEnter={() => setSelectedNodeId && setSelectedNodeId(node.label)}
            onMouseLeave={() => setSelectedNodeId && setSelectedNodeId(null)}
            data-testid={testId && `${testId}-legend-${node.link}`}
          >
            {node.label}
          </Link>
        );
      }
      return <span className={cx('link', isActive && 'link--active')}>{node.label}</span>;
    };

    for (let i = 0; i < columns; i++) {
      elements.push(
        <ul key={i} className={cx('items-column')}>
          {group.node
            .filter((node, index) => i + 1 > index / itemsInColumn && i <= index / itemsInColumn)
            .map((node) => {
              const isActive = node.label === selectedNodeId;

              return (
                <li key={node.label} className={cx('items-column__item')}>
                  <svg width={10} height={10} className={cx('items-icon')}>
                    <GraphIcon
                      type={node.icon}
                      color={node.color}
                      active={isActive}
                      startingPoint={{ x: 5, y: 5 }}
                    />
                  </svg>
                  {renderLabel(node, isActive)}
                </li>
              );
            })}
        </ul>
      );
    }

    return elements;
  };
  const groups = nodeGroups.map((group) => {
    return (
      <div key={group.name} className={cx('legends-group')}>
        <div className={cx('filters')}>
          {group.filters.map((filter) => {
            return (
              <Checkbox
                id={filter.name}
                checked={filter.checked}
                onChange={filter.handler}
                key={filter.name}
                testId={testId && `${testId}-checkbox-${filter.name}`}
                className={cx('checkbox')}
                classNameCheckbox={cx('checkbox__fake')}
              >
                <span className={cx('checkbox__label')}>{filter.name}</span>
              </Checkbox>
            );
          })}
        </div>
        <div className={cx('items')}>{legendColumns(group)}</div>
      </div>
    );
  });

  return (
    <div className={cx('ScatterPlotGraphLegend', className)} style={style}>
      {groups}
    </div>
  );
};

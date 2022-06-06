import React, { useRef } from 'react';

// Pie chart tooltip is contained a div that has some pre defined styles
// We target parent element and disable it
export const Tooltip = () => {
  const node = useRef<HTMLDivElement | null>(null);
  if (node?.current?.parentElement) {
    node.current.parentElement.style.display = 'none';
  }
  return <div ref={node} />;
};

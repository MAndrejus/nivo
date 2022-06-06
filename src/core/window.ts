import { useEffect, useState, useCallback } from 'react';

export type BreakPointSize =
  | 'phone'
  | 'mobile-landscape'
  | 'tablet'
  | 'desktop'
  | 'large-desktop'
  | 'hd-desktop';

const breakpoints: Record<BreakPointSize, number> = {
  phone: 0,
  'mobile-landscape': 576,
  tablet: 768,
  desktop: 992,
  'large-desktop': 1200,
  'hd-desktop': 1700,
};

export function useBreakpointDetector({
  from,
  to,
}: { from?: BreakPointSize; to?: BreakPointSize } = {}) {
  const minWidth = from ? breakpoints[from] : 0;
  const maxWidth = to ? breakpoints[to] : Number.MAX_SAFE_INTEGER;
  const shouldBreak = useCallback(() => {
    const isAboveOrEqualMin = minWidth <= window.innerWidth;
    const isBelowMax = maxWidth > window.innerWidth;

    return isAboveOrEqualMin && isBelowMax;
  }, [maxWidth, minWidth]);

  const [isBreakpoint, setBreakpoint] = useState<boolean>(shouldBreak());

  useEffect(() => {
    const handleResize = () => {
      if (isBreakpoint !== shouldBreak()) {
        setBreakpoint(shouldBreak());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [shouldBreak, maxWidth, minWidth, isBreakpoint]);

  return isBreakpoint;
}

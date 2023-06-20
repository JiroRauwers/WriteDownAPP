import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Rerun the `callback` fn every `delay`
 *
 * ```typescript
 * const [delay, setDelay] = useState(1000);
 *
 * // Increment the counter.
 * useInterval(() => {
 *  setCount(count + 1);
 * }, delay);
 *
 * // Make it increments the caunter faster every second
 * useInterval(()=> {
 * if(delay > 10)
 *  setDelay(delay/2)
 * }, 1000)
 * ```
 *
 * @param callback A callback Function
 * @param delay The `interval` in ms
 * @param onFirstRender default is enabled, if disable the first execution will happen only after de delay
 */
export const useInterval = (
  callback: () => void,
  delay: number,
  onFirstRender = true
) => {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (!delay) return;

    if (onFirstRender) savedCallback.current();
    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
};

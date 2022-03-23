import useUnmount from '@hooks/useUnmount';
import { MutableRefObject, useCallback, useRef } from 'react';

export default function <P>(
  fun: MutableRefObject<(prop: P) => void> | ((prop: P) => void),
) {
  const frame = useRef(0);

  const rafFun = useCallback((prop: P) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if ('current' in fun) {
        fun.current(prop);
      } else fun(prop);
    });
  }, []);

  useUnmount(() => cancelAnimationFrame(frame.current));

  return rafFun;
}

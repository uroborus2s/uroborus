import useUnmount from '@hooks/useUnmount';
import { useCallback, useRef } from 'react';

export default function <P>(fun: (prop: P) => void) {
  const frame = useRef(0);

  const rafFun = useCallback((prop: P) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      fun(prop);
    });
  }, []);

  useUnmount(() => cancelAnimationFrame(frame.current));

  return rafFun;
}

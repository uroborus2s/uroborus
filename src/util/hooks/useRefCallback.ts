import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type fun = (...arg: any[]) => any;

const useRefCallback = (fn: fun): fun => {
  const ref = useRef<fun>(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });

  return useCallback((...arg: any[]) => {
    return ref.current.call(this, ...arg);
  }, []);
};

export default useRefCallback;

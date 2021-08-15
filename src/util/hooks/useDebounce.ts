import { useEffect, useRef } from 'react';
import { CallBackFun } from '@/util/hooks/useRaf';

export default function useDebounce(
  func: CallBackFun,
  wait?: number,
): CallBackFun {
  const timeout = useRef();
  const removedTimeout = useRef(false);
  useEffect(
    () => () => {
      removedTimeout.current = true;
      clearTimeout(timeout.current);
    },
    [],
  );
  const timeWait = wait ?? 166;

  return (...arg: any[]) => {
    clearTimeout(timeout.current);
    if (!removedTimeout.current) {
      // @ts-ignore
      timeout.current = setTimeout(() => {
        func(...arg);
      }, timeWait);
    }
  };
}

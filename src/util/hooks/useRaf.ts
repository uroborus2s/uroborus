import { useEffect, useRef } from 'react';
import raf from 'raf';

export declare type CallBackFun = (...args: any[]) => any;

const useRaf = (callback: CallBackFun): CallBackFun => {
  const rafRef = useRef<number | null>(null);
  const removedRef = useRef(false);
  useEffect(
    () => () => {
      removedRef.current = true;
      raf.cancel(rafRef.current!);
    },
    [],
  );
  return (...arg: any[]) => {
    if (rafRef.current) raf.cancel(rafRef.current);
    if (!removedRef.current) {
      rafRef.current = raf((timestamp: number) => {
        callback.call(void 0, ...arg);
      });
    }
  };
};

export default useRaf;

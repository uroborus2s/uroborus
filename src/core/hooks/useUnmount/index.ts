import { useRefFun } from '@/core/hooks';
import { useEffect } from 'react';

export default function useUnmount(fn: any) {
  const fnPersist = useRefFun(fn);
  useEffect(function () {
    return function () {
      if (typeof fnPersist === 'function') {
        fnPersist();
      }
    };
  }, []);
}

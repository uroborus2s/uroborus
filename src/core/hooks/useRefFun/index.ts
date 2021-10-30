import { useCallback, useRef } from 'react';

type Any = ((...arg: any[]) => any) | undefined;

export default function (fn: Any): Any {
  const ref = useRef<Any>(function () {
    throw new Error('组件呈现时无法调用事件处理程序。');
  });

  if (typeof fn == 'function') {
    ref.current = fn;

    return useCallback(
      (...arg: any[]) => {
        if (ref.current) return ref.current.apply(undefined, arg);
      },
      [ref],
    );
  }
  return undefined;
}

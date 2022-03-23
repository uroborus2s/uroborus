import { useCallback, useReducer } from 'react';

export default function () {
  const [, forceUpdate] = useReducer((s) => s + 1, 0);

  return useCallback((fn?: () => void) => {
    forceUpdate();
    if (fn) fn.call(null);
  }, []);
}

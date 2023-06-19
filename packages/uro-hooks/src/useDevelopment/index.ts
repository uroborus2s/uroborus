import { useEffect } from 'react';
import type { DependencyList } from 'react';

import { isProduction } from '@uroborus/core';

export default (useHook: () => void, deps?: DependencyList) => {
  // Don't run any validation in production
  if (!isProduction()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      try {
        useHook();
      } catch (e) {
        console.error(`
          设置时出现问题。

          > ${(e as Error).message}
        `);
      }
    }, deps);
  }
};

import { invariant, isProduction } from '@uroborus/core';
import { useDevelopment, usePrevious } from '@uroborus/hooks';

import { Sensor } from '../core/index.js';

export default (sensorHooks: Sensor[]) => {
  if (!isProduction()) {
    const previousRef = usePrevious(sensorHooks);

    useDevelopment(() => {
      invariant(
        previousRef.current.length === sensorHooks.length,
        '安装后无法更改传感器挂钩的数量',
      );
    }, []);
  }
};

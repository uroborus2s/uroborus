import { useMemo, useRef } from 'react';

import { useLayoutEffect } from '@uroborus/hooks';

import {
  useKeyboardSensor,
  useMouseSensor,
  useTouchSensor,
  Lock,
} from '../core/index.js';
import type { Sensor } from '../core/index.js';

import type { SensorMarshalArgs } from './interface/DndContextProps.js';
import useCanStartDrag from './useCanStartDrag.js';
import useValidateSensors from './useValidateSensors.js';

// default sensors are now exported to library consumers
const defaultSensors: Sensor[] = [
  useMouseSensor,
  useKeyboardSensor,
  useTouchSensor,
];

export default ({
  enableDefaultSensors,
  customSensors,
  appContext,
  contextId,
}: SensorMarshalArgs) => {
  const useSensors = [
    ...(enableDefaultSensors ? defaultSensors : []),
    ...(customSensors || []),
  ];

  const wrapLockRef = useRef(new Lock());

  const canStartDrag = useCanStartDrag();

  useLayoutEffect(() => {
    wrapLockRef.current.tryAbandon();
  }, [wrapLockRef.current]);

  const api = useMemo(
    () => ({ appContext, contextId, lock: wrapLockRef.current, canStartDrag }),
    [contextId, appContext, canStartDrag],
  );

  useValidateSensors(useSensors);
  useSensors.forEach((useSensor) => useSensor(api));
};

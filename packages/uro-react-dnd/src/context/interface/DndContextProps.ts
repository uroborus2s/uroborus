import type { MutableRefObject } from 'react';

import type { Logger, LogLevel } from '@uroborus/core';

import type { ContextId, Sensor } from '../../core/index.js';

export interface AppCallbacks {
  isDragging: () => boolean;
  tryAbort: () => void;
}

export interface ErrorBoundaryProps {
  callBacksRef: MutableRefObject<AppCallbacks | undefined>;
  logger: Logger;
}

export interface SensorMarshalArgs {
  enableDefaultSensors: boolean;
  customSensors?: Sensor[];
  contextId: ContextId;
  appContext: IAppContext;
}

export interface DndContextProps {
  nonce?: string;
  logLevel?: LogLevel;

  // sensors
  sensors?: Sensor[];
  enableDefaultSensors?: boolean;
}

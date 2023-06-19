import type { LogLevel } from '@uroborus/core';
import type { Position } from 'css-box-model';

import type { Action } from '../../context/interface/IAction.js';
import type { ILockInst } from '../Lock.js';

import type { ContextId } from './GlobalType.js';
import type { DraggableId } from './IDraggable.js';
import type { ScrollOptions } from './IScrollable.js';
import type { LockPhase } from './ISeneor.js';

export type Sensor = (api: SensorAPI) => void;

export type MovementMode = 'FLUID' | 'SNAP';

export interface IsActiveArgs {
  expected: LockPhase;
  phase: LockPhase;
  shouldWarn: boolean;
  lockFun: ILockInst;
}

export interface CreateDragStartArgs {
  contextId: ContextId;
  logLevel?: LogLevel;
  reducer: (action: Action) => boolean | void;
}
export interface TryStartArgs {
  draggableId: DraggableId;
  forceSensorStop?: () => void;
  sourceEvent?: Event;
}

export interface LiftArgs {
  id: DraggableId;
  clientSelection: Position;
  movementMode: MovementMode;
}
export interface SensorAPI {}

export interface LiftRequest {
  draggableId: DraggableId;
  scrollOptions: ScrollOptions;
}

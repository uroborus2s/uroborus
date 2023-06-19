import { Position } from 'css-box-model';

export enum MemoryPhaseType {
  IDLE,
  PENDING,
  DRAGGING,
}

export type LockPhase = 'PRE_DRAG' | 'DRAGGING' | 'COMPLETED';

export interface Idle {
  type: MemoryPhaseType.IDLE;
}

export interface Pending {
  type: MemoryPhaseType.PENDING;
  point: Position;
  actions: {};
}

export interface Dragging {
  type: MemoryPhaseType.DRAGGING;
  actions: {};
}

export type Phase = Idle | Pending | Dragging;

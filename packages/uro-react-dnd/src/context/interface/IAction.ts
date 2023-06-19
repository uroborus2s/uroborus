import type { Position } from 'css-box-model';

import type { DraggableId } from '../../core/index.js';

import type { IState } from './IState.js';

export enum ActionType {
  FLUSH,
  CAN_START_DRAG,
  MOVE,
}

export interface FlushAction {
  type: ActionType.FLUSH;
  payload: undefined;
}

export interface CanStartDragAction {
  type: ActionType.CAN_START_DRAG;
  payload: { id: DraggableId };
}

export interface MoveAction {
  type: ActionType.MOVE;
  payload: { client: Position };
}

export type Action = FlushAction | CanStartDragAction | MoveAction;

export interface ReducerOptions {
  action: Action;
  state: IState;
  setState: (valOrUpdater: IState | ((state: IState) => IState)) => void;
}

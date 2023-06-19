import { ActionType, ReducerOptions } from '../context/interface/IAction.js';
import { StatePhase } from '../context/interface/IState.js';

const canStartDrag = ({ state, action }: ReducerOptions) => {
  if (action.type === ActionType.CAN_START_DRAG) {
    if (state.phase === StatePhase.IDLE) {
      return true;
    }
    // Can lift depending on the type of drop animation
    if (state.phase !== StatePhase.DROP_ANIMATING) {
      return false;
    }

    if (state.completed.result.draggableId === action.payload.id) {
      return false;
    }

    // if dropping - allow lifting
    // if cancelling - disallow lifting
    return state.completed.result.reason === 'DROP';
  }
  return false;
};

const flush = ({ setState }: ReducerOptions) => {
  setState({ phase: StatePhase.IDLE, shouldFlush: true });
};

export const reducers = {
  [ActionType.FLUSH]: flush,
  [ActionType.CAN_START_DRAG]: canStartDrag,
};

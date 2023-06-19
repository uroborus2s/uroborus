import { useRecoilCallback } from 'recoil';

import type { DraggableId } from '../core/index.js';

import { globalAppState } from './GlobalState.js';
import { IState, StatePhase } from './interface/IState.js';

export default () => {
  return useRecoilCallback(
    ({ snapshot }) =>
      (id: DraggableId) => {
        const state = snapshot.getLoadable(globalAppState).contents as IState;
        // Ready to go!
        if (state.phase === StatePhase.IDLE) {
          return true;
        }

        // Can lift depending on the type of drop animation
        if (state.phase !== StatePhase.DROP_ANIMATING) {
          return false;
        }

        if (state.completed.result.draggableId === id) {
          return false;
        }

        // if dropping - allow lifting
        // if cancelling - disallow lifting
        return state.completed.result.reason === 'DROP';
      },
    [],
  );
};

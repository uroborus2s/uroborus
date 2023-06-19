import { useRecoilCallback } from 'recoil';

import { globalAppState } from './GlobalState.js';
import { IState, StatePhase } from './interface/IState.js';

export default () => {
  return useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const state = snapshot.getLoadable(globalAppState).contents as IState;
        return (
          state.phase === StatePhase.DRAGGING ||
          state.phase === StatePhase.COLLECTING
        );
      },
    [],
  );
};

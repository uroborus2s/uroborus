import { atom } from 'recoil';

import type { IState } from './interface/IState.js';
import { StatePhase } from './interface/IState.js';

export const globalAppState = atom<IState>({
  key: '@uroborus/dnd-app-state',
  default: { phase: StatePhase.IDLE, shouldFlush: false },
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue, isReset) => {
        if (
          'isDragging' in oldValue &&
          oldValue.isDragging &&
          (!('isDragging' in newValue) ||
            ('isDragging' in newValue && !newValue.isDragging))
        ) {
        }
      });
    },
  ],
});

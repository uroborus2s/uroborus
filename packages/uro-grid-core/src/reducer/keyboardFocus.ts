import { atom } from 'recoil';

import { ActionName, GridAction } from './actionName.js';

export const keyboardFocusClassState = atom({
  key: '@uroborus/grid/keyboard-focus-class',
  default: false,
});

export interface KeyboardFocusOptions extends GridAction {}

export default async ({ type, ...args }: KeyboardFocusOptions) => {
  args.set(keyboardFocusClassState, type === ActionName.KEYBOARD_FOCUS);
};

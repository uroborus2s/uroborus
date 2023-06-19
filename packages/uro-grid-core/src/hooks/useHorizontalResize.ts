import { atom } from 'recoil';

export const horizontalResizeClassAtom = atom({
  key: '@uroborus/grid/hor-resize-css',
  default: {
    cursor: false,
    userSelect: false,
  },
});

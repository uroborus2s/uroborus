import { atom } from 'recoil';

import type { DomLayoutType } from '../interface/gridOptions.js';

export const layoutClassAtom = atom<DomLayoutType>({
  key: '@uroborus/grid/domLayout',
  default: 'normal',
});

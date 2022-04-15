import { atom } from 'recoil';

export const GridRootOptionsContext = atom({
  key: '@uroborus/grid-root-options',
  default: '',
});

export const GridApiContext = atom({
  key: '@uroborus/grid-row',
  default: '',
});

export const GridError = atom({
  key: '@uroborus/grid-error',
  default: undefined,
});

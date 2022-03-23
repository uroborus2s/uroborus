import { atom } from 'recoil';

export const GridRootOptionsContext = atom({
  key: '@uroborus/ibr-grid/root-options',
  default: '',
});

export const GridApiContext = atom({
  key: '@uroborus/ibr-grid/api',
  default: '',
});

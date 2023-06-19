import { atom, atomFamily } from 'recoil';

const gridColumns = atomFamily({
  key: '@uroborus/grid/columns',
});

const columnIds = atom({
  key: '@uroborus/grid/colIds',
});

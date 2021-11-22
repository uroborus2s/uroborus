import { createContext } from 'react';
import { atom } from 'recoil';

export const defaultColumnHeaderHight = 32;
export const defaultRowHight = 32;
export const rowNumberWidth = 66;

export const GridStateContext = createContext({
  fixedColumnWidth: 0,
  columnHeaderHight: defaultColumnHeaderHight,
  rowHight: defaultRowHight,
});

export const rowAddHoverState = atom({
  key: 'GridView/RowAddHoverState',
  default: false,
});

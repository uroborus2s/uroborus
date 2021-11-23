import { atom } from 'recoil';

export const defaultColumnHeaderHight = 32;
export const defaultRowHight = 32;
export const rowNumberWidth = 66;
export const addColumnButtonWidth = 32;

export const rowAddHoverState = atom({
  key: 'GridView/RowAddHoverState',
  default: false,
});

export const gridScrollTop = atom({
  key: 'GridView/rowScrollTop',
  default: 0,
});

export const gridScrollLeft = atom({
  key: 'GridView/rowScrollLeft',
  default: 0,
});

import { atom, atomFamily } from 'recoil';

export const DefaultRowHeight = {
  short: 32,
  medium: 56,
  tall: 88,
  extraTall: 128,
};

export const defaultSummaryBarHight = 34;

export const defaultColumnHeaderHight = 32;
export const rowNumberWidth = 66;
export const addColumnButtonWidth = 32;

//grid 表的行高
export const rowHeight = atom({
  key: 'GridView/rowHeight',
  default: DefaultRowHeight.short,
});

//新增按钮 行选中状态
export const rowAddHoverState = atom({
  key: 'GridView/rowAddHoverState',
  default: false,
});

//数据行选中状态
export const rowHoverState = atomFamily<boolean, string>({
  key: 'GridView/rowHoverState',
  default: false,
});

//grid 表格滚动上部不可见的距离
export const gridScrollTop = atom({
  key: 'GridView/rowScrollTop',
  default: 0,
});

//grid 表格滚动左部不可见的距离
export const gridScrollLeft = atom({
  key: 'GridView/rowScrollLeft',
  default: 0,
});

//是否滚动状态，滚动滚轮的时候进入scrolling 状态
export const isGridScrollingState = atom({
  key: 'GridView/isGridScrollingState',
  default: false,
});

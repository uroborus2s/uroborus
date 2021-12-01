import { createContext, Dispatch, DispatchWithoutAction } from 'react';
import { atom, atomFamily } from 'recoil';

export const DefaultRowHeight = {
  short: 32,
  medium: 56,
  tall: 88,
  extraTall: 128,
};

//底部总计栏的默认高度
export const defaultSummaryBarHight = 34;
//底部表格头部的默认高度
export const defaultColumnHeaderHight = 32;
//行号列的宽度
export const rowNumberWidth = 66;
export const addButtonMaxWidth = 160;

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

// //grid 表格滚动上部不可见的距离
// export const gridScrollTop = atom({
//   key: 'GridView/rowScrollTop',
//   default: 0,
// });
//
// //grid 表格滚动左部不可见的距离
// export const gridScrollLeft = atom({
//   key: 'GridView/rowScrollLeft',
//   default: 0,
// });

// //是否滚动状态，滚动滚轮的时候进入scrolling 状态
// export const isGridScrollingState = atom({
//   key: 'GridView/isGridScrollingState',
//   default: false,
// });

export const GridScrollDispatch = createContext<Dispatch<{
  type: 'left' | 'top';
  offset: number;
}> | null>(null);

//grid 表格滚动上部不可见的距离
export const GridScrollTop = createContext<number>(0);

//grid 表格滚动左部不可见的距离
export const GridScrollLeft = createContext<number>(0);

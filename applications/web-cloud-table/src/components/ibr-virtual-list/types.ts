import { Theme } from '@mui/material/styles/createTheme';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { ComponentType, ElementType, HTMLAttributes } from 'react';
import { VariablesizelistClasses } from './variablesizelistClasses';

// export type Align = 'auto' | 'smart' | 'center' | 'end' | 'start';

//提供给外部操作虚拟列表的对象
export interface VirtualList {
  scrollTo(scrollOffset: number): void;

  scrollToItem(index: number): void;
}

//传递给列表项组件的props参数
export interface ListChildComponentProps {
  index: number;
  isScrolling?: boolean | undefined;
}

//虚拟列表组件的props参数
export interface VariableSizeListProps extends HTMLAttributes<HTMLElement> {
  //组件的tag，默认'div'
  component?: ElementType;
  classes?: Partial<VariablesizelistClasses>;
  sx?: SxProps<Theme>;
  //虚拟列表的方向
  direction?: 'vertical' | 'horizontal';
  //容器组件的宽度
  width: number | string;
  //容器组件的高度
  height: number | string;
  //列表项的高度
  itemSize: (index: number) => number;
  //列表项的数量
  itemCount: number;
  //列表预估高度
  estimatedTotalSize?: number | string;
  //列表项组件定义
  children: ComponentType<ListChildComponentProps>;
  //屏幕外保留的列表项的数量，默认1
  overscanCount?: number;
}

//styled CSS的参数
export interface InStateProps {
  classes?: Partial<VariablesizelistClasses>;
  direction?: 'vertical' | 'horizontal';
  width: number | string;
  height: number | string;
  isScrolling: boolean;
  estimatedTotalSize: number | string;
  size?: number;
  offset?: number;
}

export interface ItemRect {
  rects: Record<number, { offset: number; size: number }>;
  lastMeasuredIndex: number;
}

export interface ListRange {
  startIndex: number;
  endIndex: number;
}

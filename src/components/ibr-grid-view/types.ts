//表格组件的参数
import { StyeldProps } from '@/core/ibr-types';
import {
  ComponentPropsWithoutRef,
  Context,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from 'react';

export type IbrGridProps = StyeldProps & ComponentPropsWithoutRef<'div'>;

export type ColumnHeaderContentProps = {
  position: 'left' | 'right';
};

export type RowDataContentProps = {
  position: 'left' | 'right';
};

export type SummaryContentProps = {
  position: 'left' | 'right';
};

export type CellDataProps = {
  cellId: string;
};

export type RowNumberProps = {
  rowId: string;
  sequence: number;
};

export type OwnerStateType = {
  columnSizes?: number | string;
  rowSizes?: number;
  columnWidth?: number;
  transform?: string;
  position?: 'left' | 'right';
};

export type ColumnHeaderProps = {
  colId: string;
};

export type ScrollBarProps = StyeldProps &
  ComponentPropsWithoutRef<'div'> & {
    maxHeight?: number;
    maxWidth?: number;
    thumbLength: number;
    scrollWidth?: number;
    scrollHeight?: number;
    scrollInnerRef: MutableRefObject<HTMLDivElement | undefined>;
    scrollOffsetContext: Context<number>;
  };

export type FiledComponentProps = {
  setParameters: Dispatch<SetStateAction<Record<string, any>>>;
  parameters: Record<string, any>;
};

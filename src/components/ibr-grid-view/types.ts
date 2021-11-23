//表格组件的参数
import { StyeldProps } from '@/core/ibr-types';
import { ColumnDataTemplate } from '@/domain/types';
import { ComponentPropsWithoutRef } from 'react';

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
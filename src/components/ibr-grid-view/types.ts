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
  fixedColumnWidth: number;
  columnHeaderHight: number;
  rowHight: number;
};

export type ColumnHeaderProps = {
  ownerState: OwnerStateType & { width: number };
  columnData: ColumnDataTemplate;
};

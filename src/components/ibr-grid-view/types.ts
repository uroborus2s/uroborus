//表格组件的参数
import { StyeldProps } from '@/core/ibr-types';
import { ColumnDataTemplate } from '@/domain/types';
import { ComponentPropsWithoutRef, createContext } from 'react';

export const GridStateContext = createContext({
  fixedColumnWidth: '',
  columnHeaderHight: '',
});

export type IbrGridProps = StyeldProps & ComponentPropsWithoutRef<'div'>;

export type PaneInnerContentProps = {
  position: 'left' | 'right';
};

export type OwnerStateType = {
  fixedColumnWidth: string;
  columnHeaderHight: string;
};

export type ColumnHeaderProps = {
  ownerState: OwnerStateType & { offset: number; width: number };
  columnData: ColumnDataTemplate;
};

export const defaultColumnHeaderHight = '32px';

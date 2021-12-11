//表格组件的参数
import { StyeldProps } from '@/core/ibr-types';
import { BaseFiledType } from '@/domain/types';
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

export type FiledComponentProps<T extends BaseFiledType = BaseFiledType> = {
  setParameters: Dispatch<SetStateAction<T>>;
  parameters: T;
};

export const columnTypeText = {
  text: 'single-text',
  multilineText: 'multi-text',
  attachment: 'attachment',
  checkbox: 'checkbox',
  select: 'single-select',
  multiSelect: 'multi-select',
  // collaborator: 'collaborator',
  date: 'datetime',
  phone: 'phone',
  email: 'email',
  url: 'url',
  decimal: 'decimal',
  currency: 'currency',
  percent: 'percent',
  duration: 'duration',
  rating: 'rating',
  formula: 'formula',
  createdTime: 'createdTime',
  lastModifiedTime: 'lastModifiedTime',
  // autoNumber: 'autoNumber',
  // createdBy: 'createdBy',
  // lastModifiedBy: 'lastModifiedBy',
  foreignKey: 'foreignKey',
} as const;

export type ColumnTypeKey = keyof typeof columnTypeText;

export const converColumnTypeFromService = (service: string): ColumnTypeKey => {
  const res = Object.entries(columnTypeText).find(
    ([key, colType]) => colType === service,
  );
  if (res) return res[0] as ColumnTypeKey;
  else return 'text';
};

export interface CellComponentProps {
  type: ColumnTypeKey;
  cellValue: any;
  mode: 'display' | 'edit';
}

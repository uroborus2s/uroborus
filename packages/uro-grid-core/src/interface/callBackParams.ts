import { GridValidRowModel } from '../porps/gridRowProps.js';

import { GridCommon } from './gridCommon.js';

export interface SendToClipboardParams<
  TData extends GridValidRowModel = GridValidRowModel,
> extends GridCommon<TData> {
  data: string;
}

export interface GetLocaleTextParams<
  TData extends GridValidRowModel = GridValidRowModel,
> extends GridCommon<TData> {
  key: string;
  defaultValue: string;
  variableValues?: string[];
}

export interface GetGroupRowAggParams<
  TData extends GridValidRowModel = GridValidRowModel,
> extends GridCommon<TData> {
  nodes: string[];
}

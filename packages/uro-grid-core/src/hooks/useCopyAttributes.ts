import { toBoolean, toNumber } from '@uroborus/core';

import type { GridProps } from '../components/gridProps.js';
import type { GridOptions } from '../interface/gridOptions.js';
import type { GridValidRowModel } from '../porps/gridRowProps.js';

const getCoercionLookup = <TData extends GridValidRowModel = any>() => {
  const coercionLookup = {} as Record<
    keyof GridOptions<TData>,
    'boolean' | 'number' | 'none'
  >;
  ['enableRtl'].forEach((key) => {
    coercionLookup[key as keyof GridOptions<TData>] = 'boolean';
  });
  [].forEach((key) => {
    coercionLookup[key as keyof GridOptions<TData>] = 'number';
  });
  [].forEach((key) => {
    coercionLookup[key as keyof GridOptions<TData>] = 'none';
  });
  return coercionLookup;
};

const getGridOptionKeys = <TData extends GridValidRowModel = any>(
  component: any,
  isVue: boolean,
) =>
  (isVue ? Object.keys(getCoercionLookup()) : Object.keys(component)) as Array<
    keyof GridOptions
  >;

const getValue = <TData extends GridValidRowModel = any>(
  key: keyof GridOptions<TData>,
  rawValue: any,
) => {
  const coercionStep = getCoercionLookup()[key];
  let value;
  if (coercionStep === 'number') {
    value = toNumber(rawValue);
  } else if (coercionStep === 'boolean') {
    value = toBoolean(rawValue);
  } else if (coercionStep === 'none') {
    value = rawValue;
  } else value = undefined;
  return value;
};

export function useCopyAttributesToGridOptions<
  TData extends GridValidRowModel = any,
>(props: GridProps<TData> = {}, isValue = false) {
  const gridOptions: GridOptions<TData> = props.gridOptions || {};

  getGridOptionKeys(gridOptions, isValue).forEach((key) => {
    const value = getValue(key, props[key]);
    if (typeof value !== 'undefined') {
      Object.defineProperty(gridOptions, key, { value });
      if (props[key] !== undefined) delete props[key];
    }
  });
  return { ...props, gridOptions };
}

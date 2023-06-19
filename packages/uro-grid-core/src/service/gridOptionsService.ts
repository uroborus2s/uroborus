import { MutableRefObject } from 'react';

import {
  EventFunction,
  EventService,
  EventType,
  exists,
  isTrue,
  toNumber,
} from '@uroborus/core';

import { ColumnApi } from '../interface/columnApi.js';
import { GridApi } from '../interface/gridApi.js';
import { GridCommon, WithoutGridCommon } from '../interface/gridCommon.js';
import type { GridOptions } from '../interface/gridOptions.js';

type GetKeys<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 *  获取类型为“any”的 GridProps属性。
 *  通过查找可以扩展不存在的字符串的属性来工作。
 *  这将只是“any”类型的属性。
 */
export type ObjectAnyProperty<T extends object> = GetKeys<
  Required<T>,
  'NO_MATCH'
>;

export type ObjectExcludeAny<T extends object> = Omit<T, ObjectAnyProperty<T>>;

/**
 * Get all the GridOption properties that strictly contain the provided type.
 * Does not include `any` properties.
 */
export type KeysOfType<T extends object, U> = GetKeys<
  Required<ObjectExcludeAny<T>>,
  U
>;

type GetCallBackFunKeys<T> = {
  [K in keyof T]: T[K] extends (arg: infer PA) => any
    ? PA extends GridCommon
      ? K
      : never
    : never;
}[keyof T];

type BooleanProps = KeysOfType<GridOptions, boolean>;
type NumberProps = KeysOfType<GridOptions, number>;
type CallbackProperty = GetCallBackFunKeys<
  Required<ObjectExcludeAny<GridOptions>>
>;

type NonPrimitiveProps = Exclude<keyof GridOptions, BooleanProps | NumberProps>;

type ExtractParamsFromCallback<TCallback> = TCallback extends (
  params: infer PA,
) => any
  ? PA extends GridCommon
    ? PA
    : never
  : never;
type ExtractReturnTypeFromCallback<TCallback> = TCallback extends (
  params: GridCommon,
) => infer RT
  ? RT
  : never;
type WrappedCallback<
  K extends CallbackProperty,
  OriginalCallback extends Required<GridOptions>[K] = Required<GridOptions>[K],
> =
  | undefined
  | ((
      params: WithoutGridCommon<ExtractParamsFromCallback<OriginalCallback>>,
    ) => ExtractReturnTypeFromCallback<OriginalCallback>);

export class GridOptionsService {
  private readonly gridOptions: GridOptions;

  public readonly api: MutableRefObject<GridApi>;

  public readonly columnApi: MutableRefObject<ColumnApi>;

  public readonly rootElementRef: MutableRefObject<HTMLElement | undefined>;

  private readonly eventService = new EventService();

  constructor(options: {
    gridOptions: GridOptions;
    api: MutableRefObject<GridApi>;
    columnApi: MutableRefObject<ColumnApi>;
    rootElementRef: MutableRefObject<HTMLElement | undefined>;
  }) {
    this.gridOptions = options.gridOptions;
    this.api = options.api;
    this.columnApi = options.columnApi;
    this.rootElementRef = options.rootElementRef;
  }

  /**
   * 给定的 GridOption 属性是否设置为 true。
   * @param property GridOption property that has the type `boolean | undefined`
   */
  public is(property: BooleanProps): boolean {
    return isTrue(this.gridOptions[property]);
  }

  /**
   * 获取提供的 GridOptions 属性的原始值。
   * @param property
   */
  public get<K extends NonPrimitiveProps>(property: K): GridOptions[K] {
    return this.gridOptions[property];
  }

  /**
   * 将 GridOption 属性作为数字获取，原始值通过 toNumber 强制函数返回。
   * @param property GridOption property that has the type `number | undefined`
   */
  public getNum<K extends NumberProps>(property: K): number | undefined {
    return toNumber(this.gridOptions[property]);
  }

  public getDocument(): Document {
    // if user is providing document, we use the users one,
    // otherwise we use the document on the global namespace.
    let result: Document | null = null;
    if (this.gridOptions.getDocument && exists(this.gridOptions.getDocument)) {
      result = this.gridOptions.getDocument();
    } else if (this.rootElementRef.current) {
      result = this.rootElementRef.current.ownerDocument;
    }

    if (result && exists(result)) {
      return result;
    }

    return document;
  }

  addEventListener<T extends EventType>(
    key: string,
    listener: EventFunction<T>,
  ): void {
    this.eventService.addEventListener(
      key,
      listener as EventFunction<EventType>,
    );
  }

  dispatchEvent<T extends EventType>(event: T) {
    this.eventService.emit(event);
  }

  removeEventListener<T extends EventType>(
    key: string,
    listener: EventFunction<T>,
  ) {
    this.eventService.removeEventListener(
      key,
      listener as EventFunction<EventType>,
    );
  }
}

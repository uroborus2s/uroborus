import type { MutableRefObject } from 'react';

import type { TypeId } from './GlobalType.js';
import type { Subscriber, Unsubscribe } from './IRegistry.js';

export interface Descriptor<ID extends string> {
  id: ID;
  // 这在技术上是多余的，但它避免了为了获取其类型而需要查找可放置对象的容器
  type: TypeId;
}

export interface Entry<ID extends string, D extends Descriptor<ID>> {
  uniqueId: string;
  descriptor: D;
}

export interface IEntity<
  ID extends string,
  D extends Descriptor<ID>,
  T extends Entry<ID, D>,
> {
  register: (entry: MutableRefObject<T>) => void;
  update: (entry: MutableRefObject<T>, last: MutableRefObject<T>) => void;
  unregister: (entry: MutableRefObject<T>) => void;
  exists: (id: ID) => boolean;
  getById: (id: ID) => T;
  findById: (id: ID) => T | undefined;
  getAllByType: (type: TypeId) => T[];
  clean: () => void;
  subscribe(cb: Subscriber): Unsubscribe;
}

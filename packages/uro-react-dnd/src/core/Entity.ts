import type { MutableRefObject } from 'react';

import { invariant, values } from '@uroborus/core';

import type { TypeId } from './interface/GlobalType.js';
import type {
  Descriptor as DESCRIPTOR,
  Entry as ENTRY,
  IEntity,
} from './interface/IEntry.js';
import { Subscriber, Unsubscribe } from './interface/IRegistry.js';

export class Entity<
  ID extends string,
  Descriptor extends DESCRIPTOR<ID>,
  Entry extends ENTRY<ID, Descriptor>,
> implements IEntity<ID, Descriptor, Entry>
{
  private entities: Record<ID, MutableRefObject<Entry>>;

  constructor() {
    this.entities = {} as unknown as Record<ID, MutableRefObject<Entry>>;
  }

  exists(id: ID): boolean {
    return Boolean(this.findById(id));
  }

  findById(id: ID): Entry | undefined {
    return this.entities[id].current;
  }

  getAllByType(type: TypeId): Entry[] {
    return (values(this.entities) as MutableRefObject<Entry>[])
      .map((ref) => ref.current)
      .filter((entry) => entry.descriptor.type === type);
  }

  getById(id: ID): Entry {
    const entry = this.findById(id);
    invariant(entry, `Cannot find droppable entry with id [${id}]`);
    return entry!;
  }

  register(entryRef: MutableRefObject<Entry>): void {
    this.entities[entryRef.current.descriptor.id] = entryRef;
  }

  unregister(entry: MutableRefObject<Entry>): void {
    const {
      descriptor: { id },
      uniqueId,
    } = entry.current;
    const current = this.findById(id);

    // can occur if cleaned before unregister
    if (!current) {
      return;
    }

    // outdated uniqueId
    if (uniqueId !== current.uniqueId) {
      return;
    }

    delete this.entities[id];
  }

  update(entry: MutableRefObject<Entry>, last: MutableRefObject<Entry>): void {
    const current = this.entities[last.current.descriptor.id];

    // item already removed
    if (!current) {
      return;
    }

    // id already used for another mount
    if (current.current.uniqueId !== entry.current.uniqueId) {
      return;
    }

    // We are safe to delete the old entry and add a new one
    delete this.entities[last.current.descriptor.id];
    this.entities[entry.current.descriptor.id] = entry;
  }

  clean(): void {
    this.entities = {} as Record<ID, MutableRefObject<Entry>>;
  }

  // eslint-disable-next-line class-methods-use-this
  subscribe(cb: Subscriber): Unsubscribe {
    return () => {};
  }
}

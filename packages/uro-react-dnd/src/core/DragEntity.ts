import type { MutableRefObject } from 'react';

import { Entity } from './Entity.js';
import type { DraggableEntry } from './interface/IDraggable.js';
import type {
  Descriptor as DESCRIPTOR,
  Entry as ENTRY,
} from './interface/IEntry.js';
import { Subscriber, Unsubscribe } from './interface/IRegistry.js';
import { SubscriberImpl } from './Subscriber.js';

export class DragEntity<
  ID extends string,
  Descriptor extends DESCRIPTOR<ID>,
  Entry extends ENTRY<ID, Descriptor>,
> extends Entity<ID, Descriptor, Entry> {
  private _subscribers: SubscriberImpl;

  constructor() {
    super();
    this._subscribers = new SubscriberImpl();
  }

  register(entry: MutableRefObject<Entry>) {
    super.register(entry);
    this._subscribers.notify({
      type: 'ADDITION',
      value: entry.current as unknown as DraggableEntry,
    });
  }

  unregister(entry: MutableRefObject<Entry>) {
    super.unregister(entry);
    this._subscribers.notify({
      type: 'REMOVAL',
      value: entry.current as unknown as DraggableEntry,
    });
  }

  clean(): void {
    super.clean();
    this._subscribers.clean();
  }

  subscribe(cb: Subscriber): Unsubscribe {
    return this._subscribers.subscriber(cb);
  }
}

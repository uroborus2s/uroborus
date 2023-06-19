import type {
  Subscriber,
  RegistryEvent,
  Unsubscribe,
} from './interface/IRegistry.js';

export class SubscriberImpl {
  private _subscribers: Subscriber[];

  constructor() {
    this._subscribers = [];
  }

  clean() {
    this._subscribers.length = 0;
  }

  subscriber(cb: Subscriber): Unsubscribe {
    this._subscribers.push(cb);
    return () => {
      const index: number = this._subscribers.indexOf(cb);

      // might have been removed by a clean
      if (index === -1) {
        return;
      }

      this._subscribers.splice(index, 1);
    };
  }

  notify(event: RegistryEvent): void {
    if (this._subscribers.length) {
      this._subscribers.forEach((cb) => cb(event));
    }
  }
}

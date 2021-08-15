import Emitter from 'component-emitter';
import { NullableObject } from '@/util';

export type EventMap = Document<string, (...args: any[]) => void>;

export type Merge<L extends EventMap, T extends EventMap> = {
  [P in keyof L]: L[P];
} &
  {
    [R in keyof T]: T[R];
  };

export type EventName<T extends EventMap> = keyof T & string;

export type EventNames<L extends EventMap, R extends EventMap> = (
  | keyof L
  | keyof R
) &
  string;

export type EventListener<
  T extends EventMap,
  K extends EventName<T>
> = Parameters<T[K]>;

export type EventListeners<
  L extends EventMap,
  R extends EventMap,
  Ev extends EventNames<L, R>
> = Pick<Merge<L, R>, Ev>[Ev];

export abstract class StrictEventEmitter<
  L extends EventMap,
  E extends EventMap,
  R extends EventMap = NullableObject
> extends Emitter {
  on<Ev extends EventNames<L, R>>(ev: Ev, listener: EventListeners<L, R, Ev>) {
    super.on(ev, listener);
    return this;
  }

  once<Ev extends EventNames<L, R>>(
    ev: Ev,
    listener: EventListeners<L, R, Ev>,
  ) {
    super.once(ev, listener);
    return this;
  }

  emit<Ev extends EventName<E>>(ev: Ev, ...args: EventListener<E, Ev>) {
    super.emit(ev, ...args);
    return this;
  }

  emitReserved<Ev extends EventName<R>>(ev: Ev, ...args: EventListener<E, Ev>) {
    super.emit(ev, ...args);
    return this;
  }

  listeners<Ev extends EventName<R>>(event: Ev) {
    return super.listeners(event);
  }
}

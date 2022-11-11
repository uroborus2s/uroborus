import { EventType, FunctionHandler } from './event.types';
import { includes } from '../util';

const OUTSIDE_ANGULAR_EVENTS = [
  'mouseover',
  'mouseout',
  'mouseenter',
  'mouseleave',
];
const PASSIVE_EVENTS = ['touchstart', 'touchend', 'touchmove', 'touchcancel'];

export interface IFrameworkOverrides<P extends EventType> {
  /** Because Angular uses Zones, you should not use setTimeout or setInterval (as it'll keep angular constantly doing dirty checks etc
   * So to get around this, we allow the framework to specify how to execute setTimeout. The default is to just call the browser setTimeout().
   */
  setTimeout(action: FunctionHandler, timeout?: number): void;
  setInterval(action: FunctionHandler, interval?: number): Promise<number>;

  /** Again because Angular uses Zones, we allow adding some events outside of Zone JS so that we do not kick off
   * the Angular change detection. We do this for some events ONLY, and not all events, just events that get fired
   * a lot (eg mouse move), but we need to make sure in AG Grid that we do NOT call any grid callbacks while processing
   * these events, as we will be outside of ZoneJS and hence Angular2 Change Detection won't work. However it's fine
   * for our code to result in AG Grid events (and Angular application action on these) as these go through
   * Event Emitter's.
   *
   * This was done by Niall and Sean. The problematic events are mouseover, mouseout, mouseenter and mouseleave.
   */
  addEventListener(
    element: HTMLElement,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;

  dispatchEvent(
    eventType: P | string,
    listener: FunctionHandler,
    global: boolean,
  ): void;

  /*
   * vue components are specified in the "components" part of the vue component - as such we need a way to deteremine if a given component is
   * within that context - this method provides this
   * Note: This is only really used/necessary with cellRendererSelectors
   */
  frameworkComponent(name: string): any;

  /*
   * Allows framework to identify if a class is a component from that framework.
   */
  isFrameworkComponent(comp: any): boolean;
}

export class FrameworkOverrides<P extends EventType>
  implements IFrameworkOverrides<P>
{
  // for Vanilla JS, we use simple timeout
  public setTimeout(action: FunctionHandler, timeout?: number): void {
    window.setTimeout(() => action.call(this), timeout);
  }

  public setInterval(action: FunctionHandler, timeout?: any): Promise<number> {
    return new Promise((resolve) => {
      resolve(window.setInterval(() => action.call(this), timeout));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public addEventListener(
    element: HTMLElement,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    let o = options;
    if (typeof o !== 'object') {
      const isPassive = includes(PASSIVE_EVENTS, type);
      o = {
        capture: !!options,
        passive: isPassive,
      };
    }
    element.addEventListener(type, listener, o);
  }

  // for Vanilla JS, we just execute the listener
  // eslint-disable-next-line class-methods-use-this
  public dispatchEvent(
    eventType: P | string,
    listener: FunctionHandler,
    global = false,
  ): void {
    listener();
  }

  // eslint-disable-next-line class-methods-use-this
  public frameworkComponent(name: string): any {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  public isFrameworkComponent(comp: any): boolean {
    return false;
  }
}

export function addSafePassiveEventListener<P extends EventType>(
  frameworkOverrides: IFrameworkOverrides<P>,
  eElement: HTMLElement,
  event: string,
  listener: EventListenerOrEventListenerObject,
) {
  const isPassive = includes(PASSIVE_EVENTS, event);
  const options = isPassive ? { passive: true } : undefined;

  // this check is here for certain scenarios where I believe the user must be destroying
  // the grid somehow but continuing for it to be used
  if (frameworkOverrides && frameworkOverrides.addEventListener) {
    frameworkOverrides.addEventListener(eElement, event, listener, options);
  }
}

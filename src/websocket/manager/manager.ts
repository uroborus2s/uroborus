import { NullableObject } from '@/util';
import { EventMap, ManagerOptions, Packet, StrictEventEmitter } from './index';
import Backoff from 'backo2';
import Socket from './Socket';

export interface ManagerReservedEvents extends EventMap {
  open: () => void;
  error: (err: Error) => void;
  ping: () => void;
  packet: (packet: Packet) => void;
  close: (reason: string) => void;
  reconnect_failed: () => void;
  reconnect_attempt: (attempt: number) => void;
  reconnect_error: (err: Error) => void;
  reconnect: (attempt: number) => void;
}

export default class Manager extends StrictEventEmitter<
  NullableObject,
  NullableObject,
  ManagerReservedEvents
> {
  private nsps: Map<string, any>;
  private subs;
  backoff;
  opts: Partial<ManagerOptions>;
  private _reconnection = true;
  private _reconnectionAttempts = 0;
  private _reconnectionDelay = 1000;
  private _randomizationFactor = 0.5;
  private _reconnectionDelayMax = 5000;
  private _timeout = 20000;
  _readyState: 'opening' | 'open' | 'closed';
  private readonly uri;
  _autoConnect: boolean;
  engine;

  constructor(uri?: string, opts?: Partial<ManagerOptions>) {
    super();
    this.nsps = new Map<string, any>();
    this.subs = [];
    opts = opts || {};
    this.opts = opts;
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor(opts.randomizationFactor || 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay() as number,
      max: this.reconnectionDelayMax() as number,
      jitter: this.randomizationFactor() as number,
    });
    this.timeout(opts.timeout || 20000);
    this._readyState = 'closed';
    this.uri = uri;
    this._autoConnect = opts.autoConnect ?? false;
    if (this._autoConnect) this.open();
  }

  open(fn?: (err?: Error) => void): this {
    if (this._readyState === 'open') return this;
    this.engine = new Socket();
  }

  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp: string, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new socket_1.Socket(this, nsp, opts);
      this.nsps[nsp] = socket;
    }
    return socket;
  }

  reconnection(re?: boolean) {
    if (!re) return this._reconnection;
    else {
      this._reconnection = !!re;
      return this;
    }
  }

  reconnectionAttempts(re?: number) {
    if (re === undefined) return this._reconnectionAttempts;
    this._reconnectionAttempts = re;
    return this;
  }

  reconnectionDelay(re?: number) {
    let _a;
    if (re === undefined) return this._reconnectionDelay;
    this._reconnectionDelay = re;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(re);
    return this;
  }

  randomizationFactor(re?: number) {
    let _a;
    if (re === undefined) return this._randomizationFactor;
    this._randomizationFactor = re;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(re);
    return this;
  }

  reconnectionDelayMax(re?: number) {
    let _a;
    if (re === undefined) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = re;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(re);
    return this;
  }

  timeout(re?: number) {
    if (re) {
      this._timeout = re;
      return this;
    } else return this._timeout;
  }
}

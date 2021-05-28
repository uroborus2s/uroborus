export interface EngineOptions {}

export interface ManagerOptions extends EngineOptions {
  /**
   * 是否强制新的连接
   * @default false
   */
  forceNew: boolean;

  /**
   * 是否允许重新连接吗？
   * @default true
   **/
  reconnection: boolean;

  /**
   * 重新尝试连接的次数
   * @default Infinity
   */
  reconnectionAttempts: number;

  /**
   * 两次重新连接尝试之间的时间间隔（以毫秒为单位）
   * @default 1000
   */
  reconnectionDelay: number;

  /**
   * 两次重试之间的最大时间间隔（以毫秒为单位）
   * @default 5000
   */
  reconnectionDelayMax: number;
  /**
   * Used in the exponential backoff jitter when reconnecting
   * @default 0.5
   */
  randomizationFactor: number;
  /**
   * 尝试连接的超时时间（以毫秒为单位）
   * @default 20000
   */
  timeout: number;

  /**
   * 是否自动连接?
   * @default true
   */
  autoConnect: boolean;
}

export enum PacketType {
  CONNECT = 0,
  DISCONNECT = 1,
  EVENT = 2,
  ACK = 3,
  CONNECT_ERROR = 4,
  BINARY_EVENT = 5,
  BINARY_ACK = 6,
}

export interface Packet {
  type: PacketType;
  nsp: string;
  data?: any;
  id?: number;
  attachments?: number;
}

export { default as Manager } from './manager';
export * from './strict-event';

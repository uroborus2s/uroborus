import Emitter from 'component-emitter';
import websocket from './ws-browsers';

interface Socket {}

interface WebsocketOptions {
  query: URLSearchParams;
  socket: Socket;
  forceBase64: boolean;
  secure: boolean;
  port: string;
  /**
   * The param name to use as our timestamp key
   * @default 't'
   */
  timestampParam: string;

  /**
   *是否在每个传输请求中添加时间戳。
   *注意：如果浏览器是IE或Android，则将忽略此情况，在这种情况下，请求始终被标记
   *@default false
   */
  timestampRequests: boolean;

  /**每个请求将传递给服务器的标题（通过 xhr-polling和websockets）。
   *这些值可用于握手或特殊代理。
   */
  extraHeaders?: {
    [header: string]: string;
  };
}

class Websocket extends Emitter {
  private uri: URL;
  private ws: WebSocket | undefined = undefined;
  private readyState: 'opening' | 'open' | 'closed' | '';
  private writable = false;

  constructor(uri: URL) {
    super();
    this.readyState = '';
    this.uri = uri;
  }

  get name() {
    return 'websocket';
  }

  open() {
    if ('closed' === this.readyState || '' === this.readyState) {
      this.readyState = 'opening';
      this.doOpen();
    }

    return this;
  }

  close() {
    if ('opening' === this.readyState || 'open' === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  }

  send(packets) {
    if ('open' === this.readyState) {
      this.write(packets);
    } else {
      // this might happen if the transport was silently closed in the beforeunload event handler
      debug('transport is not open, discarding packets');
    }
  }

  write(packets) {
    const self = this;
    this.writable = false;
    let total = packets.length;
  }

  onOpen() {
    this.readyState = 'open';
    this.writable = true;
    this.emit('open');
  }

  onClose() {
    this.readyState = 'closed';
    this.emit('close');
  }

  onError(msg, desc) {
    const err = new Error(msg);
    err.name = 'TransportError';
    err.message = desc;
    this.emit('error', err);
    return this;
  }

  doOpen() {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    try {
      this.ws = new websocket!(this.uri.href);
    } catch (err) {}
  }

  check() {
    return (
      !!websocket &&
      !('__initialize' in websocket && this.name === Websocket.prototype.name)
    );
  }
}

export default Websocket;

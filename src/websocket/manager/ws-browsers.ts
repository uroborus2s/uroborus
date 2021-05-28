let ws:
  | {
      prototype: WebSocket;
      new (url: string, protocols?: string | string[]): WebSocket;
      readonly CLOSED: number;
      readonly CLOSING: number;
      readonly CONNECTING: number;
      readonly OPEN: number;
    }
  | undefined;

if (typeof WebSocket !== 'undefined') {
  ws = WebSocket;
} else if (typeof global !== 'undefined') {
  ws = global.WebSocket;
} else if (typeof window !== 'undefined') {
  ws = window.WebSocket;
} else if (typeof self !== 'undefined') {
  ws = self.WebSocket;
}

export default ws;

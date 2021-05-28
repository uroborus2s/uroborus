import { ManagerOptions, Manager } from './manager';
import { SocketOptions } from 'socket.io-client/build/socket';
import * as log from 'loglevel';

const cache = new Map<string, any>();

export default function wsConnect(
  uri: string,
  opts?: Partial<ManagerOptions & SocketOptions>,
) {
  opts = opts || {};
  const parsed = new URL(uri);
  const id = parsed.href;
  let io;
  if (opts.forceNew) {
    log.info(`忽略socket缓存地址${parsed.origin}`);
    io = new Manager();
  } else {
    if (!cache.has(id)) {
      cache.set(id, new Manager());
    }
    io = cache.get(id);
  }
  return io.socket(parsed.path, opts);
}

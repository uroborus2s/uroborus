import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default function (url: string, options?: any) {
  const _ws = useRef<WebSocket>();
  const [state, focus] = useState({});

  if (_ws.current) {
    _ws.current.onmessage = (ev) => {
      console.log(ev.data);
    };

    _ws.current.onopen = (ev) => {
      console.log('正在连接');
    };

    _ws.current.onclose = (ev) => {
      console.log('正在关闭');
    };

    _ws.current.onerror = (ev) => {
      console.log('连接错误');
    };
  }

  useEffect(() => {
    // _ws.current = new WebSocket(url);
    focus({});
    return () => {
      if (_ws.current) _ws.current.close();
    };
  }, []);

  return _ws.current;
}

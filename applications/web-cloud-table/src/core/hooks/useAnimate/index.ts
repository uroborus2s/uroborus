import useUnmount from '@hooks/useUnmount';
import { useRef, useState } from 'react';

function easeInOutSin(time: number) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

export default function <S>(
  initialState: (salt?: number) => S,
  options: {
    duration?: number;
    ease?: (time: number) => number;
    cb?: (...args: any[]) => void;
  } = {},
) {
  const {
    ease = easeInOutSin,
    duration = 300, // standard
    cb,
  } = options;

  const [state, setState] = useState(() => initialState());

  const cancelled = useRef(false);

  const start = useRef<number>();

  const cancel = () => {
    cancelled.current = true;
  };

  const timer = useRef<number>();

  const step = (timestamp: number) => {
    if (cancelled.current) {
      if (cb) cb(new Error('Animation cancelled'));
      return;
    }

    if (start.current === undefined) start.current = timestamp;

    const time = Math.min(1, (timestamp - start.current) / duration);
    setState(initialState(ease(time)));

    if (time >= 1) {
      timer.current = requestAnimationFrame(() => {
        if (cb) cb(null);
      });
      return;
    }

    timer.current = requestAnimationFrame(step);
  };

  const animate = () => {
    if (timer.current) cancelAnimationFrame(timer.current);
    timer.current = requestAnimationFrame(step);
  };

  useUnmount(() => {
    if (timer.current) cancelAnimationFrame(timer.current);
  });

  return { state, cancel, animate };
}

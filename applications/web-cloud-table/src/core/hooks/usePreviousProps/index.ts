import { useEffect, useRef } from 'react';

export default function <T = {}>(props: T) {
  const previous = useRef<T>();

  useEffect(() => {
    previous.current = props;
  });

  return previous.current;
}

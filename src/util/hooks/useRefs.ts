import React, { RefObject, useRef } from 'react';

export default function useRefs<T>(): {
  getRef: (key: React.Key) => RefObject<T>;
  removeRef: (key: React.Key) => void;
} {
  const cacheRefs = useRef(new Map<React.Key, RefObject<T>>());

  const getRef = (key: React.Key) => {
    if (!cacheRefs.current.has(key)) {
      cacheRefs.current.set(key, React.createRef<T>());
    }

    return cacheRefs.current.get(key)!;
  };

  const removeRef = (key: React.Key) => {
    cacheRefs.current.delete(key);
  };

  return { getRef, removeRef };
}

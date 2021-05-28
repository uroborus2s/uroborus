import React from 'react';

declare type Updater<T> = (prev: T) => T;

export default function <T>(
  defaultState: T,
  onChange: (newValue: T, prevValue: T) => void,
): [T, (updater: T | Updater<T>) => void] {
  const stateRef = React.useRef(defaultState);
  const [s, forceUpdate] = React.useState({});

  const setState = (updater: T | Updater<T>) => {
    const newValue =
      typeof updater === 'function'
        ? (updater as Updater<T>)(stateRef.current)
        : updater;
    if (newValue !== stateRef.current) {
      onChange(newValue, stateRef.current);
    }

    stateRef.current = newValue;
    forceUpdate({});
  };

  return [stateRef.current, setState];
}

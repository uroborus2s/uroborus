import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export default function (effect: EffectCallback, deps?: DependencyList) {
  const frist = useRef(true);

  useEffect(() => {
    if (frist.current) {
      frist.current = false;
      return;
    }
    return effect();
  }, deps);
}

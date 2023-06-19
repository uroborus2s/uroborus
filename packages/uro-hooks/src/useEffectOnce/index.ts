import { useEffect, useRef, useState } from 'react';

const useEffectOnce = (effect: () => void | (() => () => void)) => {
  const effectFn = useRef<() => void | (() => () => void)>(effect);
  const destroyFn = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const rendered = useRef(false);
  const [, setVal] = useState<number>(0);

  if (effectCalled.current) {
    rendered.current = true;
  }
  useEffect(() => {
    // 仅在第一次执行效果
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current.call(undefined);
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!rendered.current) {
        return;
      }

      // otherwise this is not a dummy destroy, so call the destroy func
      if (destroyFn.current && typeof destroyFn.current === 'function') {
        destroyFn.current.call(undefined);
      }
    };
  }, []);
};

export default useEffectOnce;

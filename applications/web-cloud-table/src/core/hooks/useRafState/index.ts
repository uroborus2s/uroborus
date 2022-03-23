import useUnmount from '@hooks/useUnmount';
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

export default function <S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);

  const frame = useRef(0);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(function () {
      setState(value);
    });
  }, []);

  useUnmount(() => cancelAnimationFrame(frame.current));

  return [state, setRafState];
}

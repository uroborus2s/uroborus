import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';

export default function <S>(
  initialState: S | (() => S),
): [MutableRefObject<S>, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const refState = useRef(state);

  refState.current = state;

  console.log(refState.current, state);

  return [refState, setState];
}

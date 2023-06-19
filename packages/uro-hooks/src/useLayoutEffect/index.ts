import { useLayoutEffect, useEffect } from 'react';

const usePassiveLayoutEffect =
  typeof document !== 'undefined' && document.createElement !== undefined
    ? useLayoutEffect
    : useEffect;

export default usePassiveLayoutEffect;

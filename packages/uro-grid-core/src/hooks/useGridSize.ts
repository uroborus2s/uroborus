import type { MutableRefObject, RefObject } from 'react';

import { useResizeObserver } from '@uroborus/hooks';
import { atom, useSetRecoilState } from 'recoil';

export const gridSizeAtom = atom<{
  width: undefined | number;
  height: undefined | number;
}>({
  key: '@uroborus/grid/size',
  default: { width: undefined, height: undefined },
});

export default (localRootRef: MutableRefObject<HTMLElement | null>) => {
  const setGridSize = useSetRecoilState(gridSizeAtom);
  useResizeObserver({
    ref: localRootRef as unknown as RefObject<HTMLElement>,
    setState: setGridSize,
  });
};

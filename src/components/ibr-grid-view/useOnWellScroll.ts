//在表格页滚动滑轮，设置上层页面的 pointerEvents ='auto'，结束滚动后(200ms内没有滚动发生)，设置pointerEvents ='none'
import { isGridScrollingState } from '@ibr/ibr-grid-view/Context';
import { DebouncedFunc } from 'lodash';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';

export default function () {
  const [isScrolling, setScrolling] = useRecoilState(isGridScrollingState);

  const refState = useRef(isScrolling);

  refState.current = isScrolling;

  const handleOnWell = useRef<DebouncedFunc<() => void>>();

  useEffect(() => {
    handleOnWell.current = debounce(
      () => {
        console.log(refState.current);
        if (refState.current) {
          setScrolling(false);
        } else {
          setScrolling(true);
        }
      },
      500,
      { leading: true, trailing: true },
    );
    return () => {
      handleOnWell.current?.cancel();
    };
  }, []);

  return { handleOnWell, isScrolling };
}

//在表格页滚动滑轮，设置上层页面的 pointerEvents ='auto'，结束滚动后(200ms内没有滚动发生)，设置pointerEvents ='none'
import useRefState from '@/core/hooks/useRefState';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import { useCallback, useEffect } from 'react';

export default function () {
  const [isScrolling, setScrolling] = useRefState(false);

  const endWheel = useCallback(
    debounce(() => {
      setScrolling(false);
    }, 800),
    [],
  );

  const handleOnWell = useCallback(
    throttle((event: WheelEvent) => {
      if (!isScrolling.current) {
        setScrolling(true);
        event.preventDefault();
      }
      endWheel();
    }, 300),
    [],
  );

  useEffect(
    () => () => {
      endWheel.cancel();
      handleOnWell.cancel();
    },
    [],
  );

  return { handleOnWell, isScrolling };
}

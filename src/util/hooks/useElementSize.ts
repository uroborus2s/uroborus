import { MutableRefObject, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { windowScrollBarSize } from '@ibr/ibr-scroll-bar-size/ScrollbarSize';

export default function <T extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<T | undefined>,
) {
  const {
    windowsHeight,
    windowsWidth,
    scrollHeight,
    scrollWidth,
  } = useRecoilValue(windowScrollBarSize);

  const [rect, setRect] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    clientWidth: 0,
    clientHeight: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const rectOb = ref.current.getBoundingClientRect();
      const cWidth = (ref.current as HTMLElement).clientWidth;
      const cHeight = (ref.current as HTMLElement).clientHeight;
      setRect({
        width: Math.floor(rectOb.width),
        height: Math.floor(rectOb.height),
        top: rectOb.top,
        left: rectOb.left,
        clientWidth: cWidth,
        clientHeight: cHeight,
      });
    }
  }, [windowsHeight, windowsWidth]);

  return { scrollHeight, scrollWidth, ...rect };
}

import { useRafState } from '@/core/hooks';
import useRafFun from '@/core/hooks/useRafFun';
import useRefState from '@/core/hooks/useRefState';
import {
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
  useEffect,
} from 'react';
import { RecoilState, useRecoilState } from 'recoil';

let distY = 0;
let distX = 0;

export default function (
  direction: 'horizontal' | 'vertical',
  state: RecoilState<number>,
  maxOffset: number,
  width: MutableRefObject<number>,
) {
  const [scrollOffset, setScrollOffset] = useRecoilState(state);

  const [scrolling, setScrolling] = useRefState(false);

  const [barOffset, setBarOffset] = useRafState(scrollOffset);

  const handleMouseDown = (event: ReactMouseEvent) => {
    event.stopPropagation();
    if (!scrolling.current) {
      setScrolling(true);
      distY = event.pageY;
      distX = event.pageX;
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    event.stopPropagation();
    if (scrolling.current) {
      setScrolling(false);
    }
  };

  const handleMouseMove = useRafFun((event: MouseEvent) => {
    if (scrolling.current) {
      let moveDis = 0;
      if (direction == 'horizontal') {
        moveDis = event.pageX - distX;
        distX += moveDis;
      } else {
        moveDis = event.pageY - distY;
        distY += moveDis;
      }

      const winLength = width.current;
      setBarOffset((per) =>
        Math.max(
          0,
          Math.min(
            per + moveDis,
            winLength - (winLength * winLength) / maxOffset,
          ),
        ),
      );
      moveDis *= maxOffset / winLength;
      setScrollOffset((per) =>
        Math.max(0, Math.min(per + moveDis, maxOffset - winLength)),
      );
    }
  });

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      console.log('卸载组件');
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      setScrolling(false);
    };
  }, []);

  return { handleMouseDown, barOffset };
}

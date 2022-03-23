import useRafFun from '@/core/hooks/useRafFun';
import useRefState from '@/core/hooks/useRefState';
import {
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';

let distY = 0;
let distX = 0;

export default function (
  direction: 'horizontal' | 'vertical',
  width: number,
  maxWidth: number,
  scrollInnerRef: MutableRefObject<HTMLDivElement | undefined>,
) {
  const [scrolling, setScrolling] = useRefState(false);

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

  const moveRef = useRef(function (event: MouseEvent): void {
    event.stopPropagation();
    throw new Error('组件呈现时无法调用事件处理程序。');
  });

  moveRef.current = (event: MouseEvent) => {
    if (scrolling.current) {
      let moveDis = 0;
      if (direction == 'horizontal') {
        moveDis = event.pageX - distX;
        distX += moveDis;
      } else {
        moveDis = event.pageY - distY;
        distY += moveDis;
      }

      moveDis *= maxWidth / width;

      if (scrollInnerRef.current) {
        if (direction == 'horizontal') {
          const preLeft = scrollInnerRef.current.scrollLeft;
          scrollInnerRef.current.scrollLeft = Math.max(
            0,
            Math.min(
              Math.round(preLeft + moveDis),
              Math.ceil(maxWidth - width),
            ),
          );
        } else {
          const preTop = scrollInnerRef.current.scrollTop;
          scrollInnerRef.current.scrollTop = Math.max(
            0,
            Math.min(Math.round(preTop + moveDis), Math.ceil(maxWidth - width)),
          );
        }
      }
    }
  };

  const handleMouseMove = useRafFun<MouseEvent>(moveRef);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      setScrolling(false);
    };
  }, []);

  return handleMouseDown;
}

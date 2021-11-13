import { useRafState } from '@/core/hooks';
import useRefState from '@/core/hooks/useRefState';

export default function () {
  const [width, setWidth] = useRafState(403);
  const [isMove, setMove] = useRefState(false);

  const handleMousedown = () => {
    document.body.style.cursor = 'ew-resize';
    document.getElementById('root')!.style.pointerEvents = 'none';
    setMove(true);
  };
  const handleMouseUp = () => {
    document.body.style.cursor = 'auto';
    document.getElementById('root')!.style.pointerEvents = 'auto';
    setMove(false);
  };

  const handleMoveToResize = (event: MouseEvent) => {
    if (isMove.current) {
      const viewElem = document.getElementById('view-container');
      if (viewElem) {
        const left = viewElem.getBoundingClientRect().left;
        const width = event.pageX - left;
        if (width >= 182 && width <= 602) setWidth(width);
      }
    }
  };

  return { width, isMove, handleMouseUp, handleMousedown, handleMoveToResize };
}

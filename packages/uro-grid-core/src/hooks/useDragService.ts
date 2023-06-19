import { useCallback } from 'react';

export interface DragListenerParams {
  /** 拖动多少像素后应开始拖动操作。默认为 4px。 */
  dragStartPixels?: number;
  /** 有些地方可能希望忽略某些事件，例如范围选择忽略shift点击 */
  skipMouseEvent?: (mouseEvent: MouseEvent) => boolean;
  /** 拖动开始的回调 */
  onDragStart: (mouseEvent: MouseEvent | Touch) => void;
  /** 拖动停止的回调 */
  onDragStop: (mouseEvent: MouseEvent | Touch) => void;
  /** 拖动时鼠标移动的回调 */
  onDragging: (mouseEvent: MouseEvent | Touch) => void;
}

export default (
  {
    skipMouseEvent,
    dragStartPixels,
    onDragging,
    onDragStop,
    onDragStart,
  }: DragListenerParams,
  includeTouch = false,
) => {
  const onMouseDown = useCallback((event: MouseEvent) => {
    if (skipMouseEvent && skipMouseEvent(event)) return;

    // 如果有两个具有父子关系的元素，并且都是可拖动的，
    // 当我们拖孩子的时候，我们不应该拖父母。
    // 这方面的一个例子是行移动和范围选择——当使用拖动 rowDrag 组件时，行移动应该得到优先考虑。
    if ((event as any).alreadyProcessedByDragService) {
      return;
    }

    (event as any).alreadyProcessedByDragService = true;

    // 只对左键点击感兴趣
    if (event.button !== 0) {
    }
  }, []);

  return { onMouseDown };
};

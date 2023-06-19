export interface DragListenerParams {
  /** 在多少像素的拖动之后，应开始拖动操作。默认为4px。 */
  dragStartPixels?: number;
  /** 要向其添加拖动处理的DOM元素 */
  eElement: HTMLElement;
  /** Some places may wish to ignore certain events, eg range selection ignores shift clicks */
  skipMouseEvent?: (mouseEvent: MouseEvent) => boolean;
  /** Callback for drag starting */
  onDragStart: (mouseEvent: MouseEvent | Touch) => void;
  /** Callback for drag stopping */
  onDragStop: (mouseEvent: MouseEvent | Touch) => void;
  /** Callback for mouse move while dragging */
  onDragging: (mouseEvent: MouseEvent | Touch) => void;
}

export default (params: DragListenerParams, includeTouch = false) => {
  const onMouseDown = (mouseEvent: MouseEvent): void => {
    const e = mouseEvent as any;

    if (params.skipMouseEvent && params.skipMouseEvent(mouseEvent)) {
      return;
    }
    // if there are two elements with parent / child relationship, and both are draggable,
    // when we drag the child, we should NOT drag the parent. an example of this is row moving
    // and range selection - row moving should get preference when use drags the rowDrag component.
    if (e.alreadyProcessedByDragService) {
      return;
    }

    e.alreadyProcessedByDragService = true;

    // only interested in left button clicks
    if (mouseEvent.button !== 0) {
      return;
    }
  };
};

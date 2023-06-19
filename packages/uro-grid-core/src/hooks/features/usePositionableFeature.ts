import { MutableRefObject, useRef } from 'react';

export type ResizableSides =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'right'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'left';

export type ResizableStructure = {
  [key in ResizableSides]?: boolean;
};

export default (eRef: MutableRefObject<HTMLDivElement | null>) => {
  const resizeListenersRef = useRef<Array<any>>([]);
  const clearResizeListeners = () => {
    const resizeListeners = resizeListenersRef.current;
    while (resizeListeners.length) {
      const params = resizeListeners.pop()!;
      this.dragService.removeDragSource(params);
    }
    resizeListenersRef.current = resizeListeners;
  };

  const setResizable = (resizable: boolean | ResizableStructure) => {};
};

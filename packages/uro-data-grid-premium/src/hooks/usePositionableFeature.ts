import { MutableRefObject, useCallback, useRef } from 'react';
import { DragListenerParams } from '@/hooks/useDragService';

export interface PositionableOptions {
  popup?: boolean;
  minWidth?: number | null;
  width?: number | string | null;
  minHeight?: number | null;
  height?: number | string | null;
  centered?: boolean | null;
  calculateTopBuffer?: () => number;
  /**
   * Used for when a popup needs to be resized by an element within itself
   * In that case, the feature will configured as `popup=false` but the offsetParent
   * needs to be the popupParent.
   */
  forcePopupParentAsOffsetParent?: boolean;
  x?: number | null;
  y?: number | null;
}

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

export default (
  elementRef: MutableRefObject<HTMLDivElement | undefined>,
  config?: PositionableOptions,
) => {
  const configRef = useRef<PositionableOptions>({ popup: false, ...config });

  const resizeListenersRef = useRef<DragListenerParams[]>([]);

  const clearResizeListeners = () => {};

  const setResizable = useCallback(
    (resizable: boolean | ResizableStructure) => {},
    [],
  );
};

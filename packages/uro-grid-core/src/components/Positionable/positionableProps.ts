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

export interface PositionableProps extends PositionableOptions {
  resizable: boolean | ResizableStructure;
}

export interface PositionableOptions {
  popup?: boolean;
  minWidth?: number | null;
  width?: number | string | null;
  minHeight?: number | null;
  height?: number | string | null;
  centered?: boolean | null;
}

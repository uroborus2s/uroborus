import type { BoxModel, Position } from 'css-box-model';

export interface PlaceholderInSubject {
  // 如果没有所需的空间，占位符实际上可能不会增加
  increasedBy?: Position;
  placeholderSize: Position;
  // 如果没有框架，则添加占位符之前的最大滚动将为空
  oldFrameMaxScroll?: Position;
}

export interface Placeholder {
  client: BoxModel;
  tagName: string;
  display: string;
}

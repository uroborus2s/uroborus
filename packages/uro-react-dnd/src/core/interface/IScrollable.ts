import type { BoxModel, Rect, Position } from 'css-box-model';

export interface ScrollOptions {
  shouldPublishImmediately: boolean;
}

export interface ScrollSize {
  scrollHeight: number;
  scrollWidth: number;
}

export interface ScrollDetails {
  initial: Position;
  current: Position;
  // 框架的最大允许滚动
  max: Position;
  diff: {
    value: Position;
    // 滚动导致的实际位移与滚动本身的方向相反。
    // 向下滚动时，项目会向上移动。该值是“值”的否定版本
    displacement: Position;
  };
}

export interface IScrollable {
  // 这是观察 droppable 的窗口在拖动过程中它不会改变
  pageMarginBox: Rect;
  // 用于与动态回忆进行比较
  frameClient: BoxModel;
  scrollSize: ScrollSize;
  // 我们是否应该通过框架剪辑主题由 ignoreContainerClipping 道具控制
  shouldClipSubject: boolean;
  scroll: ScrollDetails;
}

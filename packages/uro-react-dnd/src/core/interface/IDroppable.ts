import type { BoxModel, Position, Rect } from 'css-box-model';

import type { Axis } from '../Axis.js';

import type { Descriptor, Entry, IEntity } from './IEntry.js';
import type { PlaceholderInSubject } from './IPlaceholder.js';
import type { IScrollable, ScrollOptions } from './IScrollable.js';

export type DroppableId = string;

export type DroppableIdMap = Record<DroppableId, boolean>;

export interface DroppableSubject {
  // 原始的，不变的
  page: BoxModel;
  withPlaceholder?: PlaceholderInSubject;
  // 可丢弃物的碰撞箱
  // - 页边距框
  // - 随着滚动变化
  // - 带有任何额外的可放置占位符
  // - 按帧裁剪
  // 如果命中区域完全为空，则主题将为空
  active: Rect;
}

export type DroppableMode = 'standard' | 'virtual';
export interface DroppableDescriptor extends Descriptor<DroppableId> {
  mode: DroppableMode;
}

export interface DroppableDimension {
  descriptor: DroppableDescriptor;
  axis: Axis;
  isEnabled: boolean;
  isCombineEnabled: boolean;
  // 相对于当前视口
  client: BoxModel;
  // 相对于整个页面
  isFixedOnPage: boolean;
  // 相对于页面
  page: BoxModel;
  // droppable 的容器
  frame?: IScrollable;
  // 通过框架可以看到什么
  subject: DroppableSubject;
}

export type GetDroppableDimensionFn = (
  windowScroll: Position,
  options: ScrollOptions,
) => DroppableDimension;

export interface DroppableCallbacks {
  // 阻力开始了
  getDimensionAndWatchScroll: GetDroppableDimensionFn;
  getScrollWhileDragging: () => Position;
  // 滚动一个可放置的
  scroll: (change: Position) => void;
  // 如果 Droppable 正在监听滚动事件——它需要停止！
  // 可以在未被要求观看卷轴的可投放对象上调用
  dragStopped: () => void;
}

export interface DroppableEntry
  extends Entry<DroppableId, DroppableDescriptor> {
  callbacks?: DroppableCallbacks;
}

export type IDroppable = IEntity<
  DroppableId,
  DroppableDescriptor,
  DroppableEntry
>;

export type DroppableDimensionMap = Record<DroppableId, DroppableDescriptor>;

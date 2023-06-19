import type { Position } from 'css-box-model';

import type {
  Critical,
  DraggableId,
  MovementMode,
  DraggableDimensionMap,
  DroppableDimensionMap,
  DraggableIdMap,
  DraggableLocation,
  DroppableId,
} from '../../core/index.js';

export enum StatePhase {
  IDLE,
  DROP_ANIMATING,
  DRAGGING,
  COLLECTING,
  DROP_PENDING,
}

export interface DimensionMap {
  draggables: DraggableDimensionMap;
  droppables: DroppableDimensionMap;
}

export interface Displacement {
  draggableId: DraggableId;
  shouldAnimate: boolean;
}

export interface DisplacedBy {
  value: number;
  point: Position;
}

export type DisplacementMap = Record<DraggableId, Displacement>;

export interface DisplacementGroups {
  all: DraggableId[];
  visible: DisplacementMap;
  invisible: DraggableIdMap;
}

export interface Combine {
  draggableId: DraggableId;
  droppableId: DroppableId;
}

export interface ReorderImpact {
  type: 'REORDER';
  destination: DraggableLocation;
}

export interface CombineImpact {
  type: 'COMBINE';
  combine: Combine;
}

export type ImpactLocation = ReorderImpact | CombineImpact;

export interface DragImpact {
  displaced: DisplacementGroups;
  displacedBy: DisplacedBy;
  at?: ImpactLocation;
}

export interface CompletedDrag {
  critical: Critical;
  // 拖动结果
  result: DropResult;
  impact: DragImpact;
  afterCritical: LiftEffect;
}

export interface IdleState {
  phase: StatePhase.IDLE;
  completed?: CompletedDrag;
  shouldFlush: boolean;
}

export interface DraggingState {
  phase: StatePhase.DRAGGING;
  isDragging: boolean;
  critical: Critical;
  movementMode: MovementMode;
  dimensions: DimensionMap;
  initial: DragPositions;
  current: DragPositions;
  impact: DragImpact;
  viewport: Viewport;
  afterCritical: LiftEffect;
  onLiftImpact: DragImpact;
  // 当有固定列表时，我们希望选择退出此行为
  isWindowScrollAllowed: boolean;
  // 如果我们需要跳转滚动（键盘拖动）
  scrollJumpRequest?: Position;
  // 可拖动的动作是否应该是动画的
  forceShouldAnimate?: boolean;
}

// 拖动时我们可以进入批量收集阶段在此阶段不允许拖动更新。
// 如果在此阶段发生丢弃，则必须等到完成后再继续丢弃
export interface CollectingState extends Omit<DraggingState, 'phase'> {
  phase: StatePhase.COLLECTING;
}

// 如果在批量收集期间发生删除操作，我们需要在执行删除之前等待收集完成。
// 这是为了确保所有东西在下降后都有正确的索引
export interface DropPendingState extends Omit<DraggingState, 'phase'> {
  phase: StatePhase.DROP_PENDING;
  isWaiting: boolean;
  reason: DropReason;
}

// 一个可选的阶段，用于在需要时动画掉落取消
export interface DropAnimatingState {
  phase: StatePhase.DROP_ANIMATING;
  completed: CompletedDrag;
  newHomeClientOffset: Position;
  dropDuration: number;
  // 我们仍然需要渲染占位符并固定拖动项的尺寸
  dimensions: DimensionMap;
}

export type IState =
  | IdleState
  | DraggingState
  | CollectingState
  | DropPendingState
  | DropAnimatingState;

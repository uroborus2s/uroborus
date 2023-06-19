import { invariant, noop, rafSchd } from '@uroborus/core';
import type { Position } from 'css-box-model';

import { type Action, ActionType } from '../context/interface/IAction.js';

import { DimensionMarshal } from './DimensionMarshal.js';
import { DragEntity } from './DragEntity.js';
import { DraggingPublisher } from './DraggingPublisher.js';
import findDraggable from './element/findDraggable.js';
import { isEventInInteractiveElement } from './element/interactiveElement.js';
import { Entity } from './Entity.js';
import type { ContextId } from './interface/GlobalType.js';
import type { DraggableId, IDraggable } from './interface/IDraggable.js';
import type {
  IsActiveArgs,
  LiftArgs,
  TryStartArgs,
  CreateDragStartArgs,
  LiftRequest,
} from './interface/IDragStart.js';
import type { IDroppable } from './interface/IDroppable.js';
import type { Collection, RegistryEvent } from './interface/IRegistry.js';
import { Lock } from './Lock.js';

export class DndAppContext {
  private lock: Lock;

  private readonly _logger: Log2web;

  private readonly _droppable: IDroppable;

  private readonly _draggable: IDraggable;

  private readonly contextId: ContextId;

  private readonly reducer: (action: Action) => unknown;

  private dimensionMarshal: DimensionMarshal;

  private collection?: Collection;

  private publisher: DraggingPublisher;

  constructor({ contextId, logLevel, reducer }: CreateDragStartArgs) {
    this.lock = new Lock();
    this._logger = new Log2web({
      name: `@uroborus/simple-dnd-${contextId}`,
      logLevel,
    });
    this._draggable = new DragEntity();
    this._droppable = new Entity();
    this.contextId = contextId;
    this.reducer = reducer;
    this.dimensionMarshal = new DimensionMarshal();
    this.publisher = new DraggingPublisher(this._draggable);
  }

  get draggable() {
    return this._draggable;
  }

  get droppable() {
    return this._droppable;
  }

  get logger() {
    return this._logger;
  }

  startPublishing({ draggableId }: LiftRequest) {
    invariant(
      !this.collection,
      'Cannot start capturing critical dimensions as there is already a collection',
    );
    const entry = this.draggable.getById(draggableId);

    const home = this.droppable.getById(entry.descriptor.droppableId);

    const subscribe = (event: RegistryEvent) => {
      invariant(
        this.collection,
        'Should only be subscribed when a collection is occurring',
      );
      const dragging = this.collection!.critical.draggable;

      if (event.type === 'ADDITION') {
        if (this.shouldPublishUpdate(event)) {
          this.publisher.add(event.value);
        }
      }
      if (event.type === 'REMOVAL') {
        if (this.shouldPublishUpdate(event)) {
          this.publisher.remove(event.value);
        }
      }
    };

    this._draggable.subscribe(subscribe);
  }

  canStartDrag(draggableId: DraggableId) {
    return this.reducer({
      type: ActionType.CAN_START_DRAG,
      payload: { id: draggableId },
    });
  }

  canStart(draggableId: DraggableId) {
    if (this.lock.isClaimed()) return false;

    const entry = this.draggable.findById(draggableId);

    if (!entry) {
      this.logger.warn(`Unable to find draggable with id: ${draggableId}`);
      return false;
    }

    // draggable is not enabled - cannot start
    if (!entry.options.isEnabled) {
      return false;
    }

    // Application might now allow dragging right now
    return this.canStartDrag(draggableId);
  }

  isActive({ lockFun, shouldWarn, expected, phase }: IsActiveArgs) {
    if (!this.lock.isActive(lockFun)) {
      if (shouldWarn) {
        this.logger.warn(`
        无法执行操作。
        传感器不再具有操作锁定。

        Tips:

        - 调用 forceStop() 时丢弃操作处理程序
        - 检查 actions.isActive() 如果你真的需要
      `);
      }
      return false;
    }
    // wrong phase
    if (expected !== phase) {
      if (shouldWarn) {
        this.logger.warn(`
        无法执行操作。
        您使用的操作属于过时的阶段

        当前阶段: ${expected}
        您从过时阶段调用了操作: ${phase}

        Tips:

        - 调用后不要使用预拖动操作 preDragActions.lift()
      `);
      }
      return false;
    }
    return true;
  }

  tryStart({ draggableId, sourceEvent, forceSensorStop }: TryStartArgs) {
    const shouldStart = this.canStartDrag(draggableId);

    if (!shouldStart) {
      return null;
    }

    const entry = this.draggable.getById(draggableId);
    const el = findDraggable(this.contextId, entry.descriptor.id, this.logger);

    if (!el) {
      this.logger.warn(
        `Unable to find draggable element with id: ${draggableId}`,
      );
      return null;
    }

    // Do not allow dragging from interactive elements
    if (
      sourceEvent &&
      !entry.options.canDragInteractiveElements &&
      isEventInInteractiveElement(el, sourceEvent)
    ) {
      return null;
    }

    const lock = this.lock.claim(forceSensorStop || noop);
    const phase = 'PRE_DRAG';

    const getShouldRespectForcePress = () =>
      entry.options.shouldRespectForcePress;

    const tryDispatchWhenDragging = (client: Position) => {
      if (
        this.isActive({
          shouldWarn: true,
          expected: 'DRAGGING',
          phase,
          lockFun: lock,
        })
      )
        this.reducer({ type: ActionType.MOVE, payload: { client } });
    };

    const lift = (args: LiftArgs) => {};

    const fluidLift = (clientSelection: Position) => {
      const move = rafSchd(tryDispatchWhenDragging);

      const api = lift();

      return { ...api, move };
    };

    const isActive = () => {
      this.isActive({
        lockFun: lock,
        shouldWarn: false,
        expected: 'PRE_DRAG',
        phase,
      });
    };
    return {
      isActive,
      shouldRespectForcePress: getShouldRespectForcePress,
    };
  }

  shouldPublishUpdate(entry: RegistryEvent) {
    const dragging = this.collection!.critical.draggable;
    if (entry.value.descriptor.id === dragging.id) {
      return false;
    }
    // do not publish updates for draggables that are not of a type that we care about
    if (entry.value.descriptor.type !== dragging.type) {
      return false;
    }

    const home = this._droppable.getById(entry.value.descriptor.droppableId);

    if (home.descriptor.mode !== 'virtual') {
      this.logger.warn(`
      You are attempting to add or remove a Draggable [id: ${entry.value.descriptor.id}]
      while a drag is occurring. This is only supported for virtual lists.

      See https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/virtual-lists.md
    `);
      return false;
    }

    return true;
  }
}

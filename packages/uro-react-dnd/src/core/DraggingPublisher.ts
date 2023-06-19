import { timings } from '@uroborus/core';

import type {
  DraggableEntry,
  DraggableEntryMap,
  DraggableIdMap,
} from './interface/IDraggable.js';
import { IDraggable } from './interface/IDraggable.js';
import type { DroppableIdMap } from './interface/IDroppable.js';

export class DraggingPublisher {
  private frameId?: number;

  private additions: DraggableEntryMap = {};

  private removals: DraggableIdMap = {};

  private modified: DroppableIdMap = {};

  private readonly _draggable: IDraggable;

  private static timingKey = 'Publish collection from DOM';

  constructor(draggable: IDraggable) {
    this._draggable = draggable;
  }

  private reset() {
    this.additions = {};
    this.removals = {};
    this.modified = {};
  }

  private collect() {
    if (this.frameId) {
      return;
    }
    const { additions } = this;
    this.frameId = requestAnimationFrame(() => {
      timings.start(DraggingPublisher.timingKey);
      Object.keys(additions).map((id) =>
        this._draggable.getById(id).getDimension({ x: 0, y: 0 }),
      );

      this.reset();
    });
  }

  add(entry: DraggableEntry) {
    const { id } = entry.descriptor;
    this.additions[id] = entry;
    this.modified[entry.descriptor.droppableId] = true;

    if (this.removals[id]) {
      delete this.removals[id];
    }
    this.collect();
  }

  remove(entry: DraggableEntry) {
    const { descriptor } = entry;
    this.removals[descriptor.id] = true;
    this.modified[descriptor.droppableId] = true;

    if (this.additions[descriptor.id]) {
      delete this.additions[descriptor.id];
    }
    this.collect();
  }

  stop() {
    if (!this.frameId) {
      return;
    }

    cancelAnimationFrame(this.frameId);
    this.frameId = undefined;
    this.reset();
  }
}

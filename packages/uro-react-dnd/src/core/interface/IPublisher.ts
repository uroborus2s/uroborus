import type {
  DraggableIdMap,
  DraggableEntry,
  DraggableEntryMap,
} from './IDraggable.js';

export interface Staging {
  additions: DraggableEntryMap;
  removals: DraggableIdMap;
  modified: DraggableIdMap;
}

export interface Publisher {
  add: (entry: DraggableEntry) => void;
  remove: (entry: DraggableEntry) => void;
  stop: () => void;
}

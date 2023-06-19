import type { DragImpact } from '../context/interface/IState.js';

export const whatIsDraggedOver = ({ at }: DragImpact) => {
  if (!at) {
    return null;
  }

  if (at.type === 'REORDER') {
    return at.destination.droppableId;
  }

  return at.combine.droppableId;
};

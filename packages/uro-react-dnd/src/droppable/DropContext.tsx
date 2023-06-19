import { type FC, type PropsWithChildren, createContext, useMemo } from 'react';

import type { DraggableId, DroppableId, TypeId } from '../core/index.js';

import { DropContextProps } from './interface/DroppableProps.js';

export interface DroppableContextValue {
  isUsingCloneFor?: DraggableId;
  droppableId: DroppableId;
  type?: TypeId;
}

export const DroppableContext = createContext<DroppableContextValue | null>(
  null,
);

const DropContext: FC<PropsWithChildren<DropContextProps>> = ({
  children,
  droppableId,
  type,
  useClone,
}) => {
  const isUsingCloneFor = useClone ? useClone.dragging.draggableId : undefined;

  const droppableContext = useMemo(
    () => ({
      droppableId,
      type,
      isUsingCloneFor,
    }),
    [droppableId, isUsingCloneFor, type],
  );

  return (
    <DroppableContext.Provider value={droppableContext}>
      {children}
    </DroppableContext.Provider>
  );
};

export default DropContext;

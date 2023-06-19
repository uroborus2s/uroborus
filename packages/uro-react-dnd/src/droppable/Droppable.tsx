import { type FC, type PropsWithChildren, useMemo } from 'react';

import DropContext, { DroppableContext } from './DropContext.js';
import type { DroppableProps } from './interface/DroppableProps.js';
import useDroppableSelector from './useDroppableSelector.js';

const Droppable: FC<PropsWithChildren<DroppableProps>> = ({
  children,
  ...props
}) => {
  const { useClone } = useDroppableSelector(props);
  const isUsingCloneFor = useClone ? useClone.dragging.draggableId : null;

  const droppableContext = useMemo(
    () => ({
      type,
    }),
    [],
  );

  return (
    <DropContext droppableId={}>
      <div>{children}</div>
    </DropContext>
  );
};

export default Droppable;

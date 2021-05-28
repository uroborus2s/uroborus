import React, { ForwardRefRenderFunction, memo } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AiOutlineProject } from 'react-icons/ai';
import { GrDrag } from 'react-icons/gr';
import { WorkspaceMode } from '@/models';
import { BaseColors } from '@/util';

interface WorkspaceItemProps {
  name: string;
  prefixCls: string;
  isDrag?: boolean;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const spaceItemWithRef: ForwardRefRenderFunction<
  HTMLElement,
  WorkspaceItemProps
> = ({ isDrag, prefixCls, name, dragHandleProps, draggableProps }, ref) => (
  <ListItem
    button
    // @ts-ignore
    ref={ref}
    className={`${prefixCls}-work-item`}
    {...draggableProps}
  >
    <ListItemIcon style={{ minWidth: '26px' }}>
      <AiOutlineProject size={16} />
    </ListItemIcon>
    <ListItemText
      primary={name}
      primaryTypographyProps={{ variant: 'caption', noWrap: true }}
    />
    {isDrag && (
      <ListItemIcon
        style={{ minWidth: '26px' }}
        {...dragHandleProps}
        className={prefixCls.concat('-drag')}
      >
        <GrDrag size={18} color={BaseColors.gary5} />
      </ListItemIcon>
    )}
  </ListItem>
);

const WorkspaceItem = React.forwardRef(spaceItemWithRef);

export { WorkspaceItem };

interface DropNodeProps {
  workspaces: WorkspaceMode[];
  prefixCls: string;
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
}

const DropNode: React.FC<DropNodeProps> = ({
  onDragEnd,
  workspaces,
  prefixCls,
}) => {
  const listNode = (
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot,
  ) => (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      {workspaces.map((node, index) => {
        return (
          <Draggable draggableId={node.id} index={index} key={node.id}>
            {(provided, snapshot) => (
              <WorkspaceItem
                ref={provided.innerRef}
                draggableProps={provided.draggableProps}
                dragHandleProps={provided.dragHandleProps}
                prefixCls={prefixCls}
                isDrag
                name={node.name}
              />
            )}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </div>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-workspace-items">{listNode}</Droppable>
    </DragDropContext>
  );
};

export default memo(DropNode);

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
import { BaseColors } from '@/util';
import { useRecoilValue } from 'recoil';
import PinyinMatch from 'pinyin-match';
import { workspaceNameEntity } from '@/domain/workspace/workspace.entity';

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
  workspaces: string[];
  prefixCls: string;
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  filter: string;
}

interface WorkItemProps {
  prefixCls: string;
  id: string;
  provided: DroppableProvided;
  index: number;
  filter: string;
}

const WorkItem: React.FC<WorkItemProps> = ({
  id,
  index,
  provided,
  prefixCls,
  filter,
}) => {
  const name = useRecoilValue(workspaceNameEntity(id));
  const isFilter = filter === '';
  let isDisplay = true;

  if (!isFilter) isDisplay = PinyinMatch.match(name, filter) !== false;
  return isDisplay ? (
    <Draggable draggableId={id} index={index} key={id}>
      {(provided, snapshot) => (
        <WorkspaceItem
          ref={provided.innerRef}
          draggableProps={provided.draggableProps}
          dragHandleProps={provided.dragHandleProps}
          prefixCls={prefixCls}
          isDrag={isFilter}
          name={name}
        />
      )}
    </Draggable>
  ) : null;
};

const DropNode: React.FC<DropNodeProps> = ({
  onDragEnd,
  workspaces,
  prefixCls,
  filter,
}) => {
  const listNode = (
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot,
  ) => {
    return (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {workspaces.map((id, index) => (
          <WorkItem
            key={index}
            id={id}
            prefixCls={prefixCls}
            provided={provided}
            index={index}
            filter={filter}
          />
        ))}
        {provided.placeholder}
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-workspace-items">{listNode}</Droppable>
    </DragDropContext>
  );
};

export default memo(DropNode);

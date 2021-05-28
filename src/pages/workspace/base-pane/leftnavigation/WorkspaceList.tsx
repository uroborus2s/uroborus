import React, { memo, MouseEventHandler } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { AiTwotoneDelete } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import DropNode, { WorkspaceItem } from './DropNode';
import { CSSPrefixRequiredProps, reorder } from '@/util';
import { CurrentUserLongin } from '@/models/user/userInfo';
import log from 'loglevel';
import { WorkspaceMode, Workspaces } from '@/models';
import { siteInfoState } from '@/models/website/web-site';
import useDependentState from '@/util/hooks/useDependentState';

interface FilterNodesProps {
  filter: string;
  workspaces: WorkspaceMode[];
  prefixCls: string;
}

const FilterNodes: React.FC<FilterNodesProps> = ({
  filter,
  workspaces,
  prefixCls,
}) => (
  <>
    {workspaces
      .filter((item) => item.name.startsWith(filter))
      .map((node, index) => (
        <WorkspaceItem key={index} prefixCls={prefixCls} name={node.name} />
      ))}
  </>
);

interface ItemNodeProps {
  iconNode: React.ReactNode;
  primary: React.ReactNode;
  onClick: MouseEventHandler<HTMLElement>;
  prefixCls: string;
}

const ItemNode = ({ onClick, primary, iconNode, prefixCls }: ItemNodeProps) => (
  <ListItem button onClick={onClick} className={`${prefixCls}-work-item`}>
    <ListItemIcon style={{ minWidth: '26px' }}>{iconNode}</ListItemIcon>
    <ListItemText
      primary={primary}
      primaryTypographyProps={{ variant: 'caption' }}
    ></ListItemText>
  </ListItem>
);

interface WorkListProjectProps extends CSSPrefixRequiredProps {
  filter: string | undefined;
}

const WorkspaceList: React.FC<WorkListProjectProps> = ({
  prefixCls,
  filter,
}) => {
  const userId = useRecoilValue(CurrentUserLongin);
  const workspaces = useRecoilValue(Workspaces).getSortResultOfKey(userId);

  const { secretSocketId } = useRecoilValue(siteInfoState);
  const [dupWorkspaces, setDupWorkspaces] = useDependentState(workspaces);

  const handleAddClick = () => {
    log.warn('click');
  };

  const handleDeleteClick = () => {
    log.warn('click');
  };

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // TODO: not being called on cancel!!!
    if (result.reason === 'CANCEL') {
      return;
    }

    const destination = result.destination;

    if (!destination) {
      return;
    }

    const newSorts: WorkspaceMode[] = reorder(
      workspaces,
      result.source.index,
      destination.index,
    );
    setDupWorkspaces(newSorts);
    // run(userId, {
    //   stringifiedObjectParams: {
    //     workspaceId: result.source.droppableId,
    //     targetIndex: destination.index,
    //   },
    //   requestId: 'reqIPHlUQs1RSEDhV',
    //   secretSocketId: secretSocketId,
    // });
  };

  const filterTitle = filter ? ` 匹配 "${filter}"` : '';
  return (
    <List
      component="nav"
      subheader={
        <ListSubheader
          style={{
            color: '#CED9E0',
            lineHeight: '1.5rem',
            fontSize: '0.75rem',
            marginTop: '1rem',
          }}
          component="div"
        >
          {`工作空间目录${filterTitle}`}
        </ListSubheader>
      }
    >
      {filter ? (
        <FilterNodes
          prefixCls={prefixCls}
          filter={filter}
          workspaces={workspaces}
        />
      ) : (
        <DropNode
          onDragEnd={handleDragEnd}
          workspaces={dupWorkspaces}
          prefixCls={prefixCls}
        />
      )}
      <ItemNode
        primary="新建工作空间"
        iconNode={<IoMdAdd size={16} />}
        onClick={handleAddClick}
        prefixCls={prefixCls}
      />
      <ItemNode
        prefixCls={prefixCls}
        primary="删除"
        iconNode={<AiTwotoneDelete size={16} />}
        onClick={handleDeleteClick}
      />
    </List>
  );
};
export default memo(WorkspaceList);

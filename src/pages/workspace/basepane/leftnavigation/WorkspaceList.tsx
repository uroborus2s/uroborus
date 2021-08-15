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
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import DropNode from './DropNode';
import { CSSPrefixRequiredProps } from '@/util';
import log from 'loglevel';
import { useRecoilValue } from 'recoil';
import { workspaceIdsEntity } from '@/domain/workspace/workspace.entity';
import { useOpenNewWorkspaceDialogService } from '@/pages/workspace/newworkspace/NewWorkspaceDialog';

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
    />
  </ListItem>
);

interface WorkListProjectProps extends CSSPrefixRequiredProps {
  filter: string;
}

const WorkspaceList: React.FC<WorkListProjectProps> = ({
  prefixCls,
  filter,
}) => {
  const workspaceIDs = useRecoilValue(workspaceIdsEntity);

  const handleDeleteClick = () => {
    log.warn('click');
  };

  const handleOpenNew = useOpenNewWorkspaceDialogService();

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    // TODO: not being called on cancel!!!
    if (result.reason === 'CANCEL') {
      return;
    }

    const destination = result.destination;

    if (!destination) {
      return;
    }
  };

  const filterTitle = filter !== '' ? ` 匹配 "${filter}"` : '';
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
      <DropNode
        filter={filter}
        onDragEnd={handleDragEnd}
        workspaces={workspaceIDs}
        prefixCls={prefixCls}
      />
      <ItemNode
        primary="新建工作空间"
        iconNode={<IoMdAdd size={16} />}
        onClick={handleOpenNew}
        prefixCls={prefixCls}
      />
      <ItemNode
        prefixCls={prefixCls}
        primary="废纸篓"
        iconNode={<AiTwotoneDelete size={16} />}
        onClick={handleDeleteClick}
      />
    </List>
  );
};
export default memo(WorkspaceList);

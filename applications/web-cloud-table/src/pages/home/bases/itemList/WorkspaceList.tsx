import { CommonProps } from '@/core/ibr-types';
import { OriginDataType } from '@/pages/home/types';
import PopDialog, { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/styles';
import {
  forwardRef,
  ForwardRefRenderFunction,
  memo,
  MouseEventHandler,
  MutableRefObject,
} from 'react';
import CreatWorkspaceDialog from '../CreatWorkspaceDialog';

interface WorkspaceListProps extends CommonProps {
  workspaces: OriginDataType[];
  matchingValue: string;
  onClick?: (id: string) => void;
  addWorkspaceClick: MouseEventHandler<HTMLElement>;
  dirty: boolean;
}

const ItemBox = styled('div')({
  padding: '0.5rem',
  margin: '-0.5rem',
});

const Item = styled(ListItemButton)({
  borderRadius: '6px',
  padding: '0.5rem',
});

const ItemTitle = styled('div')({
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const ItemIcon = styled(ListItemIcon)({
  marginRight: '0.5rem',
  minWidth: 'auto',
});

const WorkspaceList: ForwardRefRenderFunction<HandleFun, WorkspaceListProps> = (
  { workspaces, matchingValue, onClick, addWorkspaceClick, dirty },
  ref,
) => {
  const header = '工作空间'.concat(
    matchingValue ? ` 匹配 '${matchingValue}'` : '',
  );

  const handlerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const id = e.currentTarget.id;
    if (onClick) onClick(id);
  };

  return (
    <>
      <List
        className="scrollbar"
        sx={{
          padding: '0 0.5rem',
          margin: '0 -0.5rem',
          boxSizing: 'border-box',
          flex: 'auto',
          overflow: 'auto',
          maxHeight: 'calc(100vh - 140px)',
        }}
        subheader={
          <ListSubheader
            disableSticky
            sx={{
              opacity: 0.5,
              marginBottom: '0.25rem',
              fontSize: '11px',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              letterSpacing: '0.1rem',
              lineHeight: 'inherit',
              backgroundColor: 'inherit',
            }}
          >
            {header}
          </ListSubheader>
        }
      >
        <ItemBox>
          {workspaces.length > 0 &&
            workspaces.map((workspace) => (
              <Item
                key={workspace.id}
                id={workspace.id}
                onClick={handlerClick}
                disabled={dirty}
              >
                <ItemIcon>
                  <WorkspacesRoundedIcon
                    sx={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '16px' }}
                  />
                </ItemIcon>
                <ItemTitle title={workspace.name}>{workspace.name}</ItemTitle>
              </Item>
            ))}
        </ItemBox>
        <Item onClick={addWorkspaceClick}>
          <ItemIcon>
            <AddSharpIcon sx={{ fontSize: '16px' }} />
          </ItemIcon>
          <ItemTitle style={{ opacity: 0.75 }} title="新建工作区">
            新建工作区
          </ItemTitle>
        </Item>
        {/*<Item>*/}
        {/*  <ItemIcon>*/}
        {/*    <DeleteRoundedIcon sx={{ fontSize: '16px' }} />*/}
        {/*  </ItemIcon>*/}
        {/*  <ItemTitle style={{ opacity: 0.75 }} title="回收站">*/}
        {/*    回收站*/}
        {/*  </ItemTitle>*/}
        {/*</Item>*/}
      </List>
      <PopDialog
        disabledCloseButton
        ref={ref}
        paperStyel={{
          width: '400px',
          borderRadius: '6px',
          padding: '1rem',
          margin: 0,
          fontWeight: 500,
          boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
        }}
      >
        <CreatWorkspaceDialog
          onScroll={onClick}
          onClose={() => {
            const addWorkRef = ref as MutableRefObject<HandleFun>;
            if (addWorkRef) addWorkRef.current?.close();
          }}
        />
      </PopDialog>
    </>
  );
};
export default memo(forwardRef(WorkspaceList), (prev, next) => {
  return (
    prev.matchingValue == next.matchingValue &&
    prev.workspaces.length == next.workspaces.length &&
    JSON.stringify(prev.workspaces) === JSON.stringify(next.workspaces) &&
    prev.onClick == next.onClick
  );
});

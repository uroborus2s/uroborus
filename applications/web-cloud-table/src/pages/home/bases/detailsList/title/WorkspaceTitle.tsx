import { DELETEWORKSPACE, EDITWORKSPACE } from '@/domain';
import ShareWorkspace from '@/pages/home/bases/detailsList/title/ShareWorkspace';
import { OriginDataType } from '@/pages/home/types';
import useDoubleClickToEdit from '@hooks/useDoubleClickToEdit';
import DeleteDialog from '@ibr/ibr-dialog/DeleteDialog';
import PopDialog, { HandleFun } from '@ibr/ibr-dialog/PopDialog';
import DeleteIcon from '@ibr/ibr-icon/DeleteIcon';
import EditIcon from '@ibr/ibr-icon/EditIcon';
import ShareIcon from '@ibr/ibr-icon/ShareIcon';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ShareIconOrgin from '@mui/icons-material/Share';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import makeStyles from '@mui/styles/makeStyles';
import styled from '@mui/styles/styled';
import { FC, memo, Ref, SyntheticEvent, useRef, useState } from 'react';
import { atom } from 'recoil';

export const currentEditWorkspaceIdState = atom({
  key: 'Workspace/CurrentEditWorkspaceIdState',
  default: '',
});

const useStyel = makeStyles({
  end: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 'none',
    display: 'flex',
    marginLeft: '1rem',
    cursor: 'pointer',
  },
  share: {
    display: 'flex',
    borderRadius: '9999px',
    flex: 'none',
    alignItems: 'center',
    marginLeft: '0.5rem',
    padding: '0.25rem 0.5rem',
    fontSize: '11px',
    lineHeight: 1.25,
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
    fontWeight: 500,
    backgroundColor: '#20c933',
    color: '#fff',
  },
});

const Title = styled('div')({
  display: 'flex',
  flex: 'auto',
  cursor: 'pointer',
  overflow: 'hidden',
  '& > .title': {
    fontSize: '2rem',
    fontWeight: 500,
    userSelect: 'none',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1.25,
    letterSpacing: '0.01rem',
    fontFeatureSettings: 'calt 0',
    margin: 0,
    padding: 0,
    ['-webkit-font-smoothing']: 'antialiased',
    ['font-feature-settings']: "'calt' 0",
  },
  '& > .more': {
    opacity: 1,
    position: 'relative',
    alignItems: 'center',
    flex: 'none',
    marginLeft: '0.25rem',
    display: 'flex',
  },
  '&:hover > .more': {
    opacity: 0.5,
  },
});

const WorkspaceMenuItem = styled(MenuItem)({
  padding: '0.5rem',
  '&:hover': { backgroundColor: 'hsla(0,0%,100%,0.1)', textDecoration: 'none' },
});

const WorkspaceMenuItemText = styled('div')({
  flex: 'none',
  marginLeft: '1rem',
});

const WorkspaceTitle: FC<{ data: OriginDataType }> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const shareRef = useRef<HandleFun>();
  const deleteRef = useRef<HandleFun>();

  const { isEdit, handleKeyboardEnter, handleToEdit, handleDoubleClick } =
    useDoubleClickToEdit(
      data.id,
      data.name,
      EDITWORKSPACE,
      currentEditWorkspaceIdState,
    );

  const classes = useStyel();

  return (
    <>
      <Title onDoubleClickCapture={handleDoubleClick}>
        {isEdit ? (
          <InputBase
            autoFocus
            required
            onBlur={(e) => {
              handleToEdit(e as SyntheticEvent<HTMLInputElement>);
            }}
            defaultValue={data.name}
            sx={{
              fontSize: '1.3262rem',
              backgroundColor: 'rgba(0,0,0,0.05)',
              fontFamily:
                "'GT Eesti Display', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
              fontWeight: 500,
              borderRadius: '6px',
              padding: '0.25px 0.5px',
              color: '#444',
              width: '50%',
            }}
            onKeyUp={handleKeyboardEnter}
          />
        ) : (
          <>
            <h2 className="title">{data.name}</h2>
            <div
              className="more"
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
            >
              <ArrowDropDownRoundedIcon />
            </div>
            <Menu
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null);
              }}
              sx={{
                '& .MuiMenu-list': {
                  borderRadius: '6px',
                  overflow: 'hidden',
                  color: '#fff',
                  backgroundColor: 'hsl(0,0%,20%)',
                  width: '136px',
                  padding: 0,
                },
              }}
            >
              <WorkspaceMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => {
                  if (shareRef.current) shareRef.current.open();
                  setAnchorEl(null);
                }}
              >
                <ShareIcon sx={{ fontSize: 16 }} />
                <WorkspaceMenuItemText>分享</WorkspaceMenuItemText>
              </WorkspaceMenuItem>
              <WorkspaceMenuItem
                disableRipple
                disableTouchRipple
                onClick={(e) => {
                  handleDoubleClick(e);
                  setAnchorEl(null);
                }}
              >
                <EditIcon sx={{ fontSize: 16 }} />
                <WorkspaceMenuItemText>重命名</WorkspaceMenuItemText>
              </WorkspaceMenuItem>
              <WorkspaceMenuItem
                disableRipple
                disableTouchRipple
                onClick={() => {
                  if (deleteRef.current) deleteRef.current.open();
                  setAnchorEl(null);
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
                <WorkspaceMenuItemText>删除</WorkspaceMenuItemText>
              </WorkspaceMenuItem>
            </Menu>
            <PopDialog
              ref={shareRef as Ref<HandleFun>}
              paperStyel={{
                height: 'calc(90% - 64px)',
                maxWidth: 'calc(100% - 64px)',
                borderRadius: '6px',
              }}
              allowClose
            >
              <ShareWorkspace name={data.name} />
            </PopDialog>
            <PopDialog
              disabledCloseButton
              ref={deleteRef as Ref<HandleFun>}
              paperStyel={{
                width: '260px',
                borderRadius: '6px',
                padding: '1rem',
                margin: 0,
                fontWeight: 500,
                boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
              }}
            >
              <DeleteDialog
                name={data.name}
                path={{ id: data.id }}
                onClose={deleteRef.current?.close}
                masterTitle="工作区"
                secTitle="最近删除的工作区可以从垃圾桶中恢复。"
                commandType={DELETEWORKSPACE}
              />
            </PopDialog>
          </>
        )}
      </Title>
      <div className={classes.end}>
        <div
          className={classes.share}
          onClick={() => {
            if (shareRef.current) shareRef.current.open();
          }}
        >
          <ShareIconOrgin sx={{ fontSize: '13px', marginRight: '0.5rem' }} />
          分享
        </div>
      </div>
    </>
  );
};

export default memo(WorkspaceTitle);

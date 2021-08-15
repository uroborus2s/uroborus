import React, {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
} from 'react';
import { cssFlex, cssFlexiCenter, CSSPrefixRequiredProps } from '@/util';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  RiArrowDownSFill,
  RiDeleteBin6Fill,
  RiEditBoxFill,
} from 'react-icons/ri';
import classNames from 'classnames';
import Icon from '@ibr/ibr-icon/Icon';
import { useRecoilState, useRecoilValue } from 'recoil';
import useMenuShow from '@/util/hooks/useMenuShow';
import useDialogShow from '@/util/hooks/useDialogShow';

//应用列表的标题
function TitleNode({
  title,
  prefixCls,
  onEdit,
  workspaceId,
}: {
  title: string;
  prefixCls: string;
  onEdit: MouseEventHandler<HTMLElement>;
  workspaceId: string;
}) {
  const claName = `${prefixCls}-label`;
  const { anchorEl, handleOpen, handleClose } = useMenuShow();

  const { open, handleOpen: openDialog, handleClose: close } = useDialogShow();

  const deletWorkspace = useDeleteWorkspace();

  const handlerSwitchToEdit = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    if (onEdit) onEdit(event);
  };

  const handlerDelete = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    openDialog(event);
  };

  const confirmDelete = (event: MouseEvent<HTMLElement>) => {
    deletWorkspace(workspaceId).then(() => {
      console.log('工作空间删除成功！');
    });
    close(event);
  };

  const textStyle = { fontSize: '14px', marginLeft: '5px' };

  return (
    <>
      <span className={classNames(cssFlex, cssFlexiCenter, claName)}>
        <Typography variant="h6">{title}</Typography>
        <Icon button icon={RiArrowDownSFill} size={16} onClick={handleOpen} />
      </span>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handlerSwitchToEdit}>
          <Icon icon={RiEditBoxFill} size={20} />
          <span style={textStyle}>修改名称</span>
        </MenuItem>
        <MenuItem onClick={handlerDelete}>
          <Icon icon={RiDeleteBin6Fill} size={20} />
          <span style={textStyle}>删除工作空间</span>
        </MenuItem>
      </Menu>
      <Dialog open={open} onClose={close}>
        <DialogTitle id="warn-delete-workspace-title">
          是否确认要删除此工作空间？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-delete-workspace-description">
            可以从废纸篓中恢复最近删除的工作空间！
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="inherit">
            取消
          </Button>
          <Button
            color="secondary"
            variant="contained"
            autoFocus
            onClick={confirmDelete}
          >
            删除工作空间
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function TextFiledNode({
  title,
  workspaceId,
}: {
  title: string;
  workspaceId: string;
}) {
  const editName = useEditWorkspace(workspaceId, title);

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    editName(event.target.value);
  };

  const handleEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      editName((event.target as HTMLInputElement).value);
    }
  };

  return (
    <TextField
      id="outlined-margin-dense"
      defaultValue={title}
      margin="dense"
      variant="outlined"
      onBlur={handleBlur}
      onKeyDown={handleEnterDown}
      autoFocus
    />
  );
}

interface SpaceTitleProps extends CSSPrefixRequiredProps {
  workspaceId: string;
}

const SpaceTitle: React.FC<SpaceTitleProps> = ({ prefixCls, workspaceId }) => {
  const [isText, setIsText] = useRecoilState(userState.isEditTitle);

  console.log(isText);

  const workName = useRecoilValue(
    userState.getWorkspaceNameFromId(workspaceId),
  );

  const handleDoubleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsText(true);
  };

  return (
    <div className={`${prefixCls}-title`} onDoubleClick={handleDoubleClick}>
      <div>
        {isText ? (
          <TextFiledNode title={workName} workspaceId={workspaceId} />
        ) : (
          <TitleNode
            title={workName}
            prefixCls={prefixCls}
            onEdit={handleDoubleClick}
            workspaceId={workspaceId}
          />
        )}
      </div>
      {/*<Button*/}
      {/*  className={`${prefixCls}-share`}*/}
      {/*  variant="contained"*/}
      {/*  endIcon={<RiUserShared2Fill size={16}></RiUserShared2Fill>}*/}
      {/*>*/}
      {/*  分享*/}
      {/*</Button>*/}
    </div>
  );
};

export default SpaceTitle;

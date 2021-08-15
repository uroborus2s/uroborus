import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useNewWorkspaceService } from '@/domain/workspace/workspace.service';
import BackdropLoading from '@ibr/ibr-loading/BackdropLoading';
import { useRunPromiseService } from '@/domain/request.hooks';
import useUnmountingState from '@hooks/useUnmountingState';

const isNewWorkspaceDialogEntity = atom({
  key: 'IsNewWorkspaceDialog',
  default: false,
});

export function useOpenNewWorkspaceDialogService() {
  const setState = useSetRecoilState(isNewWorkspaceDialogEntity);

  const openAddWorkspaceDialogService = () => {
    setState(true);
  };

  return openAddWorkspaceDialogService;
}

const NewWorkspaceDialog: React.FC = () => {
  const [isOpen, setOpen] = useRecoilState(isNewWorkspaceDialogEntity);
  const service = useNewWorkspaceService();
  const isUnmounting = useUnmountingState();
  const creatService = useRunPromiseService(service, isUnmounting);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddWorkspace = () => {
    handleClose();
    creatService();
  };

  if (creatService.loading)
    return <BackdropLoading open={creatService.loading} />;
  if (creatService.error) return <div>数据加载错误！</div>;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle id="1">{'是否确定要创建新工作区？'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          新建基本权限的工作空间！
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          取消
        </Button>
        <Button onClick={handleAddWorkspace} color="primary" autoFocus>
          创建工作区
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewWorkspaceDialog;

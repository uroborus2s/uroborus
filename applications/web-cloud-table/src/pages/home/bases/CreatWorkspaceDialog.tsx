import { CREATWORKSPACE, useDispath, workspaces } from '@/domain';
import { currentEditWorkspaceIdState } from '@/pages/home/bases/detailsList/title/WorkspaceTitle';
import { CancelButton, ConfimButtonGroups } from '@ibr/ibr-dialog/PopDialog';
import LoadingButton from '@ibr/ibr-loading/LoadingButton';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useRecoilCallback } from 'recoil';

interface AddWorkspaceDialogProps {
  onClose?: () => void;
  onScroll?: (id: string) => void;
}

const CreatWorkspaceDialog: FC<AddWorkspaceDialogProps> = ({
  onClose,
  onScroll,
}) => {
  const { run, loading } = useDispath(CREATWORKSPACE, {
    manual: true,
  });

  const handlerNewWorkspace = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        let newName = '';
        const datas = await snapshot.getPromise(workspaces.workspaces);
        let count = datas.length;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          count += 1;
          newName = '工作区 '.concat(String(count));
          const res = datas.findIndex((data) => data.name == newName);
          if (res == -1) break;
        }
        run({ data: { name: newName } }).then((res) => {
          const id = res.response.workspace?.id;
          set(currentEditWorkspaceIdState, id);
          if (onClose) onClose();
          if (onScroll) onScroll(id);
        });
      },
  );

  return (
    <>
      <Typography
        sx={{
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        确实要增加一个新的工作区吗？
      </Typography>
      <Alert
        severity="info"
        sx={{
          opacity: 0.75,
          marginBottom: '1rem',
          padding: 0,
          fontSize: '11px',
        }}
      >
        创建一个基本权限的工作区，后续更新工作区的权限和功能！
      </Alert>

      <ConfimButtonGroups>
        <CancelButton variant="text" onClick={onClose} href="">
          取消
        </CancelButton>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="error"
          onClick={handlerNewWorkspace}
          titleNode="新增工作区"
        />
      </ConfimButtonGroups>
    </>
  );
};

export default CreatWorkspaceDialog;

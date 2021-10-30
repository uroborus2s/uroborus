import { CREATWORKSPACE, useDispath, workspaces } from '@/domain';
import { CancelButton, ConfimButtonGroups } from '@ibr/ibr-dialog/PopDialog';
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC, MutableRefObject, useCallback, useEffect } from 'react';
import { VariableSizeList } from 'react-window';
import { useRecoilValue } from 'recoil';

interface AddWorkspaceDialogProps {
  onClose?: () => void;
  listRef: MutableRefObject<VariableSizeList | undefined>;
}

const NewWorkspaceDialog: FC<AddWorkspaceDialogProps> = ({
  onClose,
  listRef,
}) => {
  const { run, loading, data } = useDispath(CREATWORKSPACE, {
    manual: true,
  });
  const datas = useRecoilValue(workspaces.workspaces);

  const scrollToEnd = (id: string) => {
    console.log(datas);
    if (listRef.current) {
      const index = datas.findIndex((w) => w.id == id);
      console.log(index);
      listRef.current.scrollToItem(index, 'start');
    }
  };

  useEffect(() => {
    if (data) scrollToEnd(data.response.workspace.id);
  }, [data, datas]);

  const handlerNewWorkspace = () => {
    let newName = '工作区 ';
    let count = datas.length;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      count += 1;
      newName = newName.concat(String(count));
      const res = datas.findIndex((data) => data.name == newName);
      if (res == -1) break;
    }
    run({ data: { name: newName } }).then(() => {
      if (onClose) setTimeout(onClose, 2000);
    });
  };

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
        <Button
          variant="contained"
          color="error"
          onClick={handlerNewWorkspace}
          disabled={loading}
        >
          <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
            新增工作区
          </span>
          {loading && (
            <CircularProgress
              sx={{ position: 'absolute' }}
              size={20}
              color="inherit"
            />
          )}
        </Button>
      </ConfimButtonGroups>
    </>
  );
};

export default NewWorkspaceDialog;

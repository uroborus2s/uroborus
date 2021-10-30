import { MOVEBASE, useDispath, workspaces } from '@/domain';
import {
  CancelButton,
  ConfimButtonGroups,
  find,
  SelectWorksapceTitle,
} from '@ibr/ibr-dialog/PopDialog';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface MoveDialogProps {
  name: string;
  baseId: string;
  onClose?: () => void;
}

const MoveDialog: FC<MoveDialogProps> = ({ name, baseId, onClose }) => {
  const { run, loading } = useDispath(MOVEBASE, { manual: true });

  const workspacesDatas = useRecoilValue(workspaces.workspaces);

  const currentId = useMemo(
    () => find(workspacesDatas, baseId),
    [workspacesDatas, baseId],
  );

  const [sId, setSid] = useState(currentId);

  useEffect(() => {
    const res = find(workspacesDatas, baseId);
    if (res) {
      setSid(res);
    }
  }, [workspacesDatas, baseId]);

  return (
    <>
      <Typography
        sx={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 500 }}
      >
        移动〖 <strong>{name}</strong> 〗到另外一个工作区
      </Typography>
      <SelectWorksapceTitle>选择拷贝至工作区：</SelectWorksapceTitle>
      <Select
        onChange={(e) => {
          setSid(e.target.value);
        }}
        value={sId}
        sx={{
          marginBottom: '1rem',
          ['& .MuiSelect-outlined']: {
            padding: '0.25rem 1rem 0.25rem 0.5rem',
          },
        }}
      >
        {workspacesDatas.map((data) => (
          <MenuItem key={data.id} value={data.id}>
            {data.name}
          </MenuItem>
        ))}
      </Select>
      <ConfimButtonGroups>
        <CancelButton variant="text" onClick={onClose} href="">
          取消
        </CancelButton>
        <Button
          variant="contained"
          disabled={sId === currentId}
          onClick={() => {
            run({
              path: { id: baseId },
              data: {
                target_workspace_id: sId,
              },
            });
            if (onClose) onClose();
          }}
        >
          移动数据副本到
        </Button>
      </ConfimButtonGroups>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        移动副本...
      </Backdrop>
    </>
  );
};

export default MoveDialog;

import { DUPLIACTEBASE, useDispath, workspaces } from '@/domain';
import IosSwitch from '@ibr/ibr-switch/IosSwitch';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  CancelButton,
  ConfimButtonGroups,
  find,
  SelectWorksapceTitle,
} from '@ibr/ibr-dialog/PopDialog';

interface DupliacteDialogProps {
  name: string;
  baseId: string;
  onClose?: () => void;
}

const DupliacteDialog: FC<DupliacteDialogProps> = ({
  name,
  baseId,
  onClose,
}) => {
  const { run, loading } = useDispath(DUPLIACTEBASE, { manual: true });

  const workspacesDatas = useRecoilValue(workspaces.workspaces);

  const [sId, setSid] = useState(() => find(workspacesDatas, baseId));

  const [record, setRecords] = useState(true);

  const [comment, setComment] = useState(false);

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
        拷贝〖 <strong>{name}</strong> 〗
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
      <FormControlLabel
        sx={{ margin: '0 0 0.5rem 0' }}
        control={
          <IosSwitch
            disableRipple
            checked={record}
            onChange={(event, checked) => {
              setRecords(checked);
              if (!checked) {
                setComment(checked);
              }
              event.preventDefault();
              event.stopPropagation();
            }}
          />
        }
        label="同时复制数据副本的记录"
      />
      <FormControlLabel
        sx={{ margin: '0 0 0.5rem 0', opacity: record ? 1 : 0 }}
        control={
          <IosSwitch
            disableRipple
            checked={comment}
            onChange={(event, checked) => {
              setComment(checked);
              event.preventDefault();
              event.stopPropagation();
            }}
          />
        }
        label="同时复制数据副本的评论"
      />
      <Typography
        sx={{
          marginBottom: '1rem',
          marginTop: '0.5rem',
          opacity: 0.75,
          fontSize: '11px',
        }}
      >
        修订历史记录不会被复制！
      </Typography>
      <ConfimButtonGroups>
        <CancelButton variant="text" onClick={onClose} href="">
          取消
        </CancelButton>
        <Button
          variant="contained"
          onClick={() => {
            run({
              path: { id: baseId },
              data: {
                name: name,
                copy_comments: comment,
                copy_records: record,
                target_workspace_id: sId,
              },
            });
            if (onClose) onClose();
          }}
        >
          复制一份
        </Button>
      </ConfimButtonGroups>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        复制数据副本中...
      </Backdrop>
    </>
  );
};

export default DupliacteDialog;

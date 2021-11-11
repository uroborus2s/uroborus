import { DUPLIACTEBASE, useDispath, workspaces } from '@/domain';
import {
  CancelButton,
  ConfimButtonGroups,
  SelectWorksapceTitle,
} from '@ibr/ibr-dialog/PopDialog';
import LoadingButton from '@ibr/ibr-loading/LoadingButton';
import IosSwitch from '@ibr/ibr-switch/IosSwitch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';

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

  const currentWorkspaceId = useRecoilValue(
    workspaces.getWorkspaceIdByBaseId(baseId),
  );

  const [sId, setSid] = useState(currentWorkspaceId);

  const [record, setRecords] = useState(true);

  const [comment, setComment] = useState(false);

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
        <LoadingButton
          loading={loading}
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
            }).then(() => {
              if (onClose) onClose();
            });
          }}
          titleNode="复制一份"
        />
      </ConfimButtonGroups>
    </>
  );
};

export default DupliacteDialog;

import { MOVEBASE, useDispath, workspaces } from '@/domain';
import {
  CancelButton,
  ConfimButtonGroups,
  SelectWorksapceTitle,
} from '@ibr/ibr-dialog/PopDialog';
import LoadingButton from '@ibr/ibr-loading/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface MoveDialogProps {
  name: string;
  baseId: string;
  onClose?: () => void;
}

const MoveDialog: FC<MoveDialogProps> = ({ name, baseId, onClose }) => {
  const { run, loading } = useDispath(MOVEBASE, { manual: true });

  const workspacesDatas = useRecoilValue(workspaces.workspaces);

  const currentWorkspaceId = useRecoilValue(
    workspaces.getWorkspaceIdByBaseId(baseId),
  );

  const [sId, setSid] = useState(currentWorkspaceId);

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
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={() => {
            run({
              path: { id: baseId },
              data: {
                target_workspace_id: sId,
              },
            }).then(() => {
              if (onClose) onClose();
            });
          }}
          titleNode="移动数据副本到"
        />
      </ConfimButtonGroups>
    </>
  );
};

export default MoveDialog;

import { EDITTABLE, table, useDispath } from '@/domain';
import { CancelButton, ConfimButtonGroups } from '@ibr/ibr-dialog/PopDialog';
import LoadingButton from '@ibr/ibr-loading/LoadingButton';
import { InputBase } from '@mui/material';
import styled from '@mui/styles/styled';
import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
interface EditTableDescProps {
  onClose?: () => void;
  id: string;
  name: string;
}

const PanelRoot = styled('div')({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const EditTableDesc: FC<EditTableDescProps> = ({ id, onClose, name }) => {
  const { run, loading } = useDispath(EDITTABLE, { manual: true });
  const desc = useRecoilValue(table.desc(id));

  const [descValue, setdescValue] = useState<string>();

  console.log(descValue);

  return (
    <PanelRoot>
      <InputBase
        autoFocus
        defaultValue={desc}
        placeholder={`描述${name}`}
        onChange={(e) => setdescValue(e.target.value)}
        sx={{
          marginBottom: '0.5rem',
          padding: '0.5rem',
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: 'rgba(0,0,0,0)',
          width: '240px',
          '&.Mui-focused': {
            borderColor: 'rgba(0,0,0,0.25)',
          },
        }}
        multiline
        maxRows={10}
      />
      <ConfimButtonGroups sx={{ alignSelf: 'flex-end' }}>
        <CancelButton
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            if (onClose) onClose();
          }}
          href=""
        >
          取消
        </CancelButton>
        <LoadingButton
          sx={{ width: '120px', padding: '0.25rem 0.5rem' }}
          loading={loading}
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            run({
              path: { id: id },
              data: {
                desc: descValue,
              },
            }).then(() => {
              if (onClose) onClose();
            });
          }}
          titleNode="保存"
        />
      </ConfimButtonGroups>
    </PanelRoot>
  );
};

export default EditTableDesc;

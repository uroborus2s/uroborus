import { TargetElement } from '@/core/util';
import { useDispath } from '@/domain';
import { CancelButton, ConfimButtonGroups } from '@ibr/ibr-dialog/PopDialog';
import LoadingButton from '@ibr/ibr-loading/LoadingButton';
import { InputBase } from '@mui/material';
import Popover from '@mui/material/Popover';
import { PopoverProps } from '@mui/material/Popover/Popover';
import styled from '@mui/styles/styled';
import { FC, useState } from 'react';

interface EditDescriptonProps extends Omit<PopoverProps, 'open'> {
  anchorElem: TargetElement | undefined | null;
  closePopover: () => void;
  commandType: string;
  id: string;
  name: string;
  desc: string;
}

const PanelRoot = styled('div')({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const EditDescripton: FC<EditDescriptonProps> = ({
  anchorElem,
  closePopover,
  commandType,
  id,
  name,
  desc,
  ...popoverProps
}) => {
  const [descValue, setdescValue] = useState<string>();

  const { run, loading } = useDispath(commandType, { manual: true });

  return (
    <Popover
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      open={!!anchorElem}
      anchorEl={anchorElem as Element}
      onClose={closePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...popoverProps}
    >
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
              if (closePopover) closePopover();
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
                if (closePopover) closePopover();
              });
            }}
            titleNode="保存"
          />
        </ConfimButtonGroups>
      </PanelRoot>
    </Popover>
  );
};

export default EditDescripton;

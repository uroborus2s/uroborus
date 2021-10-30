import { DELETEBASE, useDispath } from '@/domain';
import Alert from '@mui/material/Alert';
import { CancelButton, ConfimButtonGroups } from '@ibr/ibr-dialog/PopDialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface DeleteDialogProps {
  id: string;
  onClose?: () => void;
  name: string;
  commandType: string;
  masterTitle: string;
  secTitle: string;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  id,
  commandType,
  onClose,
  name,
  masterTitle,
  secTitle,
}) => {
  const { run } = useDispath(commandType, { manual: true });

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
        确实要删除〖 <strong>{name}</strong> 〗{masterTitle}吗？
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
        {secTitle}
      </Alert>

      <ConfimButtonGroups>
        <CancelButton variant="text" onClick={onClose} href="">
          取消
        </CancelButton>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            run({
              path: { id: id },
            });
            if (onClose) onClose();
          }}
        >
          确认删除
        </Button>
      </ConfimButtonGroups>
    </>
  );
};

export default DeleteDialog;

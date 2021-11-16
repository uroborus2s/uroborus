import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { Theme } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import { SxProps } from '@mui/system';
import {
  forwardRef,
  ForwardRefRenderFunction,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from 'react';

interface PopDialogProps {
  paperStyel?: SxProps<Theme>;
  disabledCloseButton?: boolean;
  allowClose?: boolean;
}

export interface HandleFun {
  open: () => void;
  close: () => void;
}

export const CancelButton = styled(Button)({
  color: 'hsl(0,0%,20%)',
  opacity: '0.75',
  padding: '0.25rem 0.5rem',
});

export const SelectWorksapceTitle = styled('div')({
  marginBottom: '0.25rem',
  opacity: 0.8,
  fontSize: '11px',
});

export const ConfimButtonGroups = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
});

const PopDialog: ForwardRefRenderFunction<
  HandleFun,
  PropsWithChildren<PopDialogProps>
> = (
  { paperStyel, children, disabledCloseButton = false, allowClose = false },
  ref,
) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setOpenDialog(true);
      },
      close: handleCloseDialog,
    }),
    [],
  );

  return (
    <Dialog
      onClose={allowClose ? handleCloseDialog : undefined}
      open={openDialog}
      PaperProps={{
        sx: paperStyel,
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {children}

      {!disabledCloseButton && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            marginRight: '1rem',
            marginTop: '1rem',
            padding: '0.3rem',
          }}
          onClick={handleCloseDialog}
        >
          <CloseIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      )}
    </Dialog>
  );
};

export default forwardRef(PopDialog);

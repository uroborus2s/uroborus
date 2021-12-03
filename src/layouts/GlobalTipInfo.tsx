import { globalToastState, messageSnackPack } from '@/layouts/useGlobalToast';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { TransitionProps } from '@mui/material/transitions';
import { FC, SyntheticEvent, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

const GlobalTipInfo: FC = () => {
  const [{ message, open, severity, key }, setState] =
    useRecoilState(globalToastState);
  const [snack, setSnack] = useRecoilState(messageSnackPack);

  console.log('render tip');

  useEffect(() => {
    console.log('执行Effect');
    if (snack.length && snack.length > 0 && !open) {
      console.log('执行Effect 逻辑');
      const cState = snack.shift();
      if (cState) {
        setSnack([...snack]);
        setState(cState);
      }
    }
  }, [snack, open]);

  const handleClose = useCallback(
    (event: SyntheticEvent<any>, reason: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }
      setState((p) => {
        return { ...p, open: false };
      });
    },
    [],
  );

  return (
    <Snackbar
      key={key}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={TransitionDown}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default GlobalTipInfo;

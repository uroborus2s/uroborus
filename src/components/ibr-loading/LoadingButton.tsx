import CircularProgress from '@mui/material/CircularProgress';
import Button, { ButtonProps } from '@mui/material/Button';
import { CircularProgressProps } from '@mui/material/CircularProgress/CircularProgress';
import styled from '@mui/material/styles/styled';
import { Theme as DefaultTheme } from '@mui/system/createTheme/createTheme';
import { SxProps } from '@mui/system/styleFunctionSx';
import { ElementType, FC, ReactNode } from 'react';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  buttonTitleProps?: {
    as?: ElementType;
    sx?: SxProps<DefaultTheme>;
  } & JSX.IntrinsicElements['span'];
  iconProps?: CircularProgressProps;
  titleNode: ReactNode;
}

const ButtonTitle = styled('span')<{ ownerState: { loading: boolean } }>(
  ({ ownerState }) => ({
    visibility: ownerState.loading ? 'hidden' : 'visible',
  }),
);

const LoadingButton: FC<LoadingButtonProps> = ({
  loading,
  buttonTitleProps,
  titleNode,
  iconProps,
  ...other
}) => {
  return (
    <Button {...other} disabled={loading}>
      <ButtonTitle {...buttonTitleProps} ownerState={{ loading: loading }}>
        {titleNode}
      </ButtonTitle>
      {loading && (
        <CircularProgress
          sx={{ position: 'absolute' }}
          size={20}
          color="inherit"
          {...iconProps}
        />
      )}
    </Button>
  );
};

export default LoadingButton;

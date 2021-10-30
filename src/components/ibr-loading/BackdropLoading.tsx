import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import React from 'react';

interface BackdropLoadingProps {
  open: boolean;
}

const BackdropLoading: React.FC<BackdropLoadingProps> = ({ open }) => {
  return (
    <Backdrop open={open}>
      数据加载中...
      <CircularProgress />
    </Backdrop>
  );
};

export default BackdropLoading;

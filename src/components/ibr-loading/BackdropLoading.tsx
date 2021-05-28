import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import { CSSPrefixProps, getPrefixCls } from '@/util';

interface BackdropLoadingProps extends CSSPrefixProps {
  open: boolean;
}

const BackdropLoading: React.FC<BackdropLoadingProps> = ({
  open,
  prefixCls,
}) => {
  const preCls = getPrefixCls('backdrop-loading', prefixCls);

  return (
    <Backdrop classes={{ root: preCls }} open={open}>
      loading...
      <CircularProgress />
    </Backdrop>
  );
};

export default BackdropLoading;

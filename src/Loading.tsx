import React, { ForwardRefRenderFunction } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading: ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
      ref={ref}
    >
      <CircularProgress />
    </Box>
  );
};

export default React.forwardRef(Loading);

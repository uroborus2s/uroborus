import { OwnerStateType } from '@ibr/ibr-grid-view/types';
import Typography from '@mui/material/Typography';
import { GridStateContext, rowAddHoverState } from './Context';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import styled from '@mui/material/styles/styled';
import { FC, useContext } from 'react';
import { useRecoilState } from 'recoil';

const RowAddButtonRoot = styled('div')<{
  ownerState: OwnerStateType & { hover: boolean };
}>(({ ownerState }) => ({
  width: '100%',
  flex: 'none',
  borderBottom: '1px solid hsl(202,10%,88%)',
  borderRight: '1px solid #ccc',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: ownerState.hover ? '#f8f8f8' : 'hsl(0,0%,100%)',
  height: ownerState.rowHight,
  paddingLeft: '0.5rem',
}));

const RowAddButton: FC<{ position: 'left' | 'right' }> = ({ position }) => {
  const ownerState = useContext(GridStateContext);
  const [hover, setHover] = useRecoilState(rowAddHoverState);

  return (
    <RowAddButtonRoot
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      ownerState={{ hover, ...ownerState }}
    >
      {position == 'left' && (
        <AddIcon sx={{ opacity: 0.8, fontSize: '16px' }} />
      )}
      {position == 'left' && hover && (
        <Typography sx={{ opacity: 0.6, marginLeft: '0.5rem' }}>
          新增一行
        </Typography>
      )}
    </RowAddButtonRoot>
  );
};

export default RowAddButton;

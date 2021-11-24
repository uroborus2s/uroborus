import useAddRow from '@ibr/ibr-grid-view/useAddRow';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { DefaultRowHeight, rowAddHoverState } from './Context';

const RowAddButtonRoot = styled('div')({
  width: '100%',
  flex: 'none',
  borderBottom: '1px solid hsl(202,10%,88%)',
  borderRight: '1px solid #ccc',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
});

const RowAddButton: FC<{ position: 'left' | 'right'; lastRowId: string }> = ({
  position,
  lastRowId,
}) => {
  const [hover, setHover] = useRecoilState(rowAddHoverState);

  const handleClickToAddRow = useAddRow(lastRowId);

  return (
    <RowAddButtonRoot
      sx={{
        backgroundColor: hover ? '#f8f8f8' : 'hsl(0,0%,100%)',
        height: DefaultRowHeight.short,
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={handleClickToAddRow}
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

import { row } from '@/domain/row/row.repository';
import { GridStateContext } from '@ibr/ibr-grid-view/Context';
import ExpandIcon from '@ibr/ibr-icon/ExpandIcon';
import { Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';
import { OwnerStateType, RowNumberProps } from './types';
import styled from '@mui/material/styles/styled';
import { FC, useContext } from 'react';

const RowNumberRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '65px',
});

const Grabby = styled('div')<{
  ownerState: { hover: boolean } & OwnerStateType;
}>(({ ownerState }) => ({
  cursor: 'grab',
  backgroundImage: 'url(/grabby.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '2px 2px',
  width: '12px',
  flex: 'none',
  opacity: ownerState.hover ? 1 : 0,
  height: ownerState.rowHight,
}));

const RowNumber: FC<RowNumberProps> = ({ rowId, sequence }) => {
  const hover = useRecoilValue(row.rowHoverState(rowId));
  const ownerState = useContext(GridStateContext);

  return (
    <RowNumberRoot>
      <Grabby ownerState={{ ...ownerState, hover: hover }} />
      {hover ? (
        <Checkbox
          sx={{
            paddingLeft: 0,
            width: '20px',
            '& svg': {
              fontSize: '12px',
            },
          }}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        />
      ) : (
        <Typography
          sx={{
            fontSize: '11px',
            fontVariantNumeric: 'tabular-nums',
            width: '20px',
          }}
        >
          {sequence}
        </Typography>
      )}
      {hover && (
        <Tooltip title="查看记录详细内容" placement="bottom-end">
          <IconButton
            sx={{
              padding: '2px',
              marginLeft: '12px',
              width: '20px',
              height: '20px',
              '&:hover': {
                backgroundColor: '#d0f0fd',
              },
            }}
          >
            <ExpandIcon sx={{ fontSize: '16px', color: '#2d7ff9' }} />
          </IconButton>
        </Tooltip>
      )}
    </RowNumberRoot>
  );
};

export default RowNumber;

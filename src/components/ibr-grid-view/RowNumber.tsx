import { DefaultRowHeight, rowHoverState } from './Context';
import ExpandIcon from '@ibr/ibr-icon/ExpandIcon';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import { FC, memo } from 'react';
import { useRecoilValue } from 'recoil';
import { RowNumberProps } from './types';

const RowNumberRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '65px',
});

const Grabby = styled('div')({
  cursor: 'grab',
  backgroundImage: 'url(/grabby.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '2px 2px',
  width: '12px',
  flex: 'none',
  height: DefaultRowHeight.short,
});

const RowColorContainer = styled('div')({
  width: '8px',
  borderRadius: '9999px',
  height: '22px',
});

const RowNumber: FC<RowNumberProps> = ({ rowId, sequence }) => {
  const hover = useRecoilValue(rowHoverState(rowId));

  return (
    <RowNumberRoot>
      <Grabby sx={{ opacity: hover ? 1 : 0 }} />
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
      <RowColorContainer />
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

export default memo(RowNumber);

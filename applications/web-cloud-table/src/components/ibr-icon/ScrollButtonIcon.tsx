import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import styled from '@mui/styles/styled';
import { memo } from 'react';

const ScrollButtonIcon = styled(
  ({ direction, ...props }: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M14,7L9,12L14,17V7Z"
      />
    </SvgIcon>
  ),
)({
  transform: (props) => (props.direction !== 'end' ? 'none' : 'rotate(180deg)'),
  fontSize: '14px',
});

export default memo(ScrollButtonIcon);

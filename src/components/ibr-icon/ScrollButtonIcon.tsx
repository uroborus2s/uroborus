import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import styled from '@mui/styles/styled';

const ScrollButtonIcon = styled(
  ({ direction, ...props }: SvgIconProps): JSX.Element => (
    <SvgIcon viewBox="0 0 12 12" {...props}>
      <path
        fill="currentColor"
        d="M7.53 7.97a.75.75 0 0 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L5.56 6l1.97 1.97z"
      />
    </SvgIcon>
  ),
)({
  transform: (props) =>
    props.direction !== 'right' ? 'none' : 'rotate(180deg)',
});

export default ScrollButtonIcon;

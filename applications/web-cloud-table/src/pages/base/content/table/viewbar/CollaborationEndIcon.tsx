import AccountGroupIcon from '@ibr/ibr-icon/AccountGroupIcon';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import styled from '@mui/styles/styled';

const EndIconRoot = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.75,
});

const CollaborationEndIcon = () => (
  <EndIconRoot>
    <AccountGroupIcon sx={{ fontSize: '16px', marginRight: '0.5rem' }} />
    <ArrowDown sx={{ fontSize: '13px' }} />
  </EndIconRoot>
);

export default CollaborationEndIcon;

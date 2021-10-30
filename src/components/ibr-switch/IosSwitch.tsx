import styled from '@mui/material/styles/styled';
import Switch from '@mui/material/Switch';

const IosSwitch = styled(Switch)(({ theme }) => ({
  fontSize: '13px',
  height: '12px',
  width: '19.2px',
  borderRadius: '9999px',
  padding: '2px',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    position: 'relative',
    '&.Mui-checked': {
      transform: 'translateX(8px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#20c933',
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      height: '8px',
      width: '8px',
    },
  },

  ['& .MuiSwitch-track']: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 0,
    transition: theme.transitions.create(['background-color'], {
      duration: 100,
    }),
  },
}));

export default IosSwitch;

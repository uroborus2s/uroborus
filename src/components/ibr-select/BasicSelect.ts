import Select from '@mui/material/Select';
import styled from '@mui/styles/styled';

export default styled(Select)({
  boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
  borderRadius: '3px',
  minWidth: '16rem',
  backgroundColor: '#fff',
  '&:hover,&:focus': {
    boxShadow: '0 0 0 2px rgb(0 0 0 / 25%)',
  },
  '& .MuiSelect-select': {
    paddingTop: 0,
    paddingBottom: 0,
  },
  '& .MuiSelect-select:focus': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  'label+&': {
    marginTop: '1.6rem',
  },
  '&:before,&:hover:not(.Mui-disabled):before,&:after': {
    border: 'none',
  },
});

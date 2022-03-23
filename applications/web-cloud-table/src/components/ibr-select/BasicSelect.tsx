import Select from '@mui/material/Select';
import styled from '@mui/styles/styled';
import { SelectProps } from '@mui/material/Select/Select';
import { FC } from 'react';

const IbrSelect = styled(Select)({
  boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
  borderRadius: '3px',
  minWidth: '16rem',
  backgroundColor: '#fff',
  '&:hover,&:focus': {
    boxShadow: '0 0 0 2px rgb(0 0 0 / 25%)',
  },
  '& .MuiSelect-select': {
    padding: '0.25rem',
    paddingLeft: '0.5rem',
    margin: '-0.25rem',
    marginLeft: '-0.5rem',
    '& >p': {
      padding: '0.25rem 0.5rem',
    },
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
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const BasicSelect: FC<SelectProps> = (props) => {
  const menuProps = {
    sx: {
      marginTop: '1px',
      '& .MuiMenu-list': {
        padding: 0,
      },
      '& .MuiMenuItem-root': {
        paddingLeft: '0.5rem',
      },
    },
  };
  return <IbrSelect MenuProps={menuProps} {...props} />;
};

export default BasicSelect;

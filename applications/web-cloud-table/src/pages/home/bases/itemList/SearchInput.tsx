import ClearIcon from '@mui/icons-material/Clear';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styled from '@mui/styles/styled';
import React, { memo } from 'react';
import { atom, useRecoilState } from 'recoil';

interface SearchInputProps {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  clearProps: React.HTMLAttributes<HTMLElement>;
  dirty: boolean;
}

export const alignmentState = atom<'grid' | 'list'>({
  key: 'AlignmentState',
  default: 'grid',
});

const Search = styled('div')({
  alignItems: 'center',
  flex: 'none',
  display: 'flex',
  marginBottom: '1rem',
});

const SearchInput: React.FC<SearchInputProps> = ({
  inputProps,
  clearProps,
  dirty,
}) => {
  const [alignment, setAlignment] = useRecoilState(alignmentState);

  return (
    <Search>
      <Input
        inputProps={{ ...inputProps }}
        startAdornment={
          <InputAdornment position="start" sx={{ marginRight: '0px' }}>
            <SearchOutlined sx={{ fontSize: 12 }} />
          </InputAdornment>
        }
        endAdornment={
          <div>
            {dirty && (
              <IconButton
                sx={{
                  padding: '6px',
                  '&:hover': {
                    backgroundColor: 'inherit',
                  },
                }}
                title="clear"
                disableRipple
                disableTouchRipple
                tabIndex={clearProps.tabIndex}
                onClick={clearProps.onClick}
              >
                <ClearIcon sx={{ fontSize: 12 }} />
              </IconButton>
            )}
          </div>
        }
        sx={{
          flex: 'auto',
          '& .MuiInput-input': {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
        disableUnderline
        placeholder="查找工作空间或项目"
      />
      {!dirty && (
        <ToggleButtonGroup
          sx={{
            opacity: 1,
            width: '44px',
            flex: 'none',
            paddingLeft: '0.25rem',
          }}
          exclusive
          value={alignment}
          onChange={(event, value) => {
            event.stopPropagation();
            setAlignment(value);
          }}
        >
          <ToggleButton
            value="grid"
            aria-label="grid aligned"
            sx={{ border: 'none', padding: '5px' }}
          >
            <GridViewSharpIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
          <ToggleButton
            value="list"
            aria-label="list aligned"
            sx={{ border: 'none', padding: '5px' }}
          >
            <ReorderOutlinedIcon sx={{ fontSize: 12 }} />
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </Search>
  );
};

export default memo(SearchInput, (prev, next) => {
  return (
    prev.dirty == next.dirty && prev.inputProps.value == next.inputProps.value
  );
});

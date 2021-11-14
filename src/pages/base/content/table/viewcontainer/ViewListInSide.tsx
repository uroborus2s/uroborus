import filterSearchValue from '@/core/util/filterSearchValue';
import { table } from '@/domain';
import { ViewData } from '@/domain/types';
import { view } from '@/domain/view/view.repository';
import { TableIdContext } from '@/pages/base/content/table/TableContext';
import BoldCheckIcon from '@ibr/ibr-icon/BoldCheckIcon';
import ViewIcon from '@ibr/ibr-icon/ViewIcon';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import useAutocomplete from '@mui/material/useAutocomplete';
import styled from '@mui/styles/styled';
import React, { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ViewListInSideRoot = styled('div')({
  display: 'flex',
  minHeight: '144px',
  flexDirection: 'column',
  flex: 'auto',
  paddingTop: '0.5rem',
});

const ViewListInSide = () => {
  const tableId = useContext(TableIdContext);

  const viewIds = useRecoilValue(table.viewIds(tableId));

  const views = useRecoilValue(view.views(viewIds));

  const [lastUsedViewId, setLastUsedViewId] = useRecoilState(
    table.lastUsedViewId(tableId),
  );

  const { groupedOptions, getInputProps, inputValue } = useAutocomplete({
    getOptionLabel: (option) =>
      typeof option == 'string' ? option : option.name,
    options: views,
    id: 'view-list-search',
    filterOptions: filterSearchValue,
    freeSolo: true,
    open: true,
  });

  return (
    <ViewListInSideRoot>
      <InputBase
        sx={{
          marginLeft: '1rem',
          marginRight: '1rem',
          borderBottomStyle: 'solid',
          borderBottomWidth: '2px',
          transition: 'border 0.16s',
          borderColor: 'rgba(0,0,0,0.1)',
          flex: 'none',
          height: '36px',
          '&.Mui-focused': {
            borderColor: 'rgba(0,0,255,0.5)',
          },
        }}
        inputProps={{ ...getInputProps() }}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{ padding: '0.5rem 0 0.5rem 0.5rem' }}
          >
            <SearchOutlined sx={{ fontSize: 16 }} />
          </InputAdornment>
        }
        placeholder="查找视图"
      />
      <List sx={{ flex: 'auto', padding: '0.75rem' }} className="scrollbar">
        {groupedOptions &&
          groupedOptions.length > 0 &&
          (groupedOptions as ViewData[]).map((viewItem) => (
            <ListItemButton
              sx={{
                padding: '0.5rem',
                borderRadius: '3px',
              }}
              key={viewItem.id}
              disableRipple
              selected={lastUsedViewId === viewItem.id}
            >
              <ViewIcon type={viewItem.type} sx={{ marginRight: '0.5rem' }} />
              <Typography
                sx={{
                  flex: 'auto',
                  textOverflow: 'ellipsis',
                  fontSize: '14px',
                  lineHeight: 1,
                }}
              >
                {viewItem.name}
              </Typography>
              {lastUsedViewId === viewItem.id && (
                <BoldCheckIcon sx={{ fontSize: '13px', flex: 'none' }} />
              )}
            </ListItemButton>
          ))}
      </List>
    </ViewListInSideRoot>
  );
};

export default ViewListInSide;

import blankScr from '@/assets/images/pixeltrue-seo.svg';
import filterSearchValue from '@/core/util/filterSearchValue';
import BoldCheckIcon from '@ibr/ibr-icon/BoldCheckIcon';
import { TabInProps } from '@ibr/ibr-tabs';
import { ActiveTabKey } from '@ibr/ibr-tabs/core';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import useAutocomplete from '@mui/material/useAutocomplete';
import styled from '@mui/styles/styled';
import { FC, MouseEvent, ReactNode, useContext } from 'react';

const getTabName = (option: TabInProps) => {
  if (option.tab) {
    if (typeof option.tab == 'object') return String(option.tab.props.name);
    else return String(option.tab);
  }
  return '';
};

interface SearchTabInputProps {
  tabs: Array<TabInProps>;
  onTabClick: (activeKey: string, e: MouseEvent<HTMLDivElement>) => void;
  addIcon?: ReactNode;
}

const Root = styled('div')({
  borderRadius: '3px',
  boxShadow: '0 0 0 2px rgb(0 0 0 / 10%)',
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem 1rem',
  maxWidth: '32rem',
  minWidth: '22rem',
  minHeight: '15rem',
  maxHeight: '40rem',
});

const Blank = styled('div')({
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const TabListPopover: FC<SearchTabInputProps> = ({
  tabs,
  onTabClick,
  addIcon,
}) => {
  const { groupedOptions, getInputProps } = useAutocomplete({
    getOptionLabel: getTabName,
    options: tabs,
    id: 'table-search',
    filterOptions: filterSearchValue,
    freeSolo: true,
    open: true,
  });

  const { activeKey } = useContext(ActiveTabKey);

  return (
    <Root>
      <InputBase
        inputProps={{ ...getInputProps() }}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{ marginRight: '0px', padding: '0.5rem' }}
          >
            <SearchOutlined sx={{ fontSize: 16 }} />
          </InputAdornment>
        }
        sx={{
          borderBottomStyle: 'solid',
          borderBottomWidth: '2px',
          borderBottomColor: 'rgba(0,0,0,0.1)',
          fontSize: '13px',
          padding: '0.25rem 0',
          flex: 'none',
        }}
        placeholder="查找表格"
      />
      {groupedOptions.length > 0 ? (
        <List sx={{ padding: '0.5rem 0', flex: 'auto' }}>
          {(groupedOptions as TabInProps[]).map((tab) => (
            <ListItemButton
              disableRipple
              key={tab.key}
              id={tab.key}
              sx={{
                borderRadius: '3px',
                textDecoration: 'none',
                padding: '0.5rem 0',
                color: 'hsl(0,0%,20%)',
              }}
              onClick={(e) => {
                if (onTabClick) onTabClick(tab.key, e);
              }}
            >
              <ListItemIcon
                sx={{
                  visibility: activeKey === tab.key ? 'visible' : 'hidden',
                  padding: '0 0.5rem',
                  minWidth: '0',
                  flex: 'none',
                  fontSize: '16px',
                }}
              >
                <BoldCheckIcon sx={{ fontSize: '16px' }} />
              </ListItemIcon>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {getTabName(tab)}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Blank>
          <Box
            component="img"
            src={blankScr}
            sx={{ width: '200px', marginBottom: '2rem' }}
          />
          <Typography>没有匹配到表格</Typography>
        </Blank>
      )}
      {addIcon}
    </Root>
  );
};

export default TabListPopover;

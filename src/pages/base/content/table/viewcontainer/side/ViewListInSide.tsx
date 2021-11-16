import filterSearchValue from '@/core/util/filterSearchValue';
import { EDITTABLE, table, useDispath } from '@/domain';
import { ViewData } from '@/domain/types';
import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TablePage';
import HovweDropButton from '@ibr/ibr-hover-drop-button/HoverDropButton';
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
import { FC, useContext, useEffect } from 'react';
import {
  atom,
  atomFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { TableIdContext } from '../../TableContext';

const ViewListInSideRoot = styled('div')({
  display: 'flex',
  minHeight: '144px',
  flexDirection: 'column',
  flex: 'auto',
  paddingTop: '0.5rem',
});

const ViewListRoot = styled('div')({});

const isViewEditState = atomFamily({
  key: 'BasePage/IsViewEditState',
  default: false,
});

const ViewList: FC<{ viewData: ViewData }> = ({ viewData }) => {
  const [isEdit, setIsEdit] = useRecoilState(isViewEditState(viewData.id));
  const [currentViewId, setCurrentViewId] = useRecoilState(currentViewIdState);

  const { run } = useDispath(EDITTABLE, { manual: true });

  const isActive = currentViewId === viewData.id;
  const tableId = useContext(TableIdContext);

  return (
    <ViewListRoot>
      {isEdit ? (
        <div />
      ) : (
        <ListItemButton
          sx={{
            padding: '0.5rem',
            borderRadius: '3px',
            '&:hover .IuiHoverButton-hover,&:active .IuiHoverButton-hover': {
              opacity: 1,
            },
          }}
          disableRipple
          selected={isActive}
          onClick={() => {
            run({
              path: { id: tableId },
              data: { selected_view_id: viewData.id },
            }).then();
            if (!isActive) setCurrentViewId(viewData.id);
          }}
        >
          <ViewIcon type={viewData.type} sx={{ marginRight: '0.5rem' }} />
          <Typography
            sx={{
              flex: 'auto',
              textOverflow: 'ellipsis',
              fontSize: '14px',
              lineHeight: 1,
            }}
          >
            {viewData.name}
          </Typography>
          <HovweDropButton
            size={12}
            sx={{
              position: 'relative',
              right: 'auto',
              bottom: 'auto',
              flex: 'none',
              backgroundColor: 'rgba(0,0,0,0.25)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
            }}
          />
          <BoldCheckIcon
            sx={{
              fontSize: '13px',
              flex: 'none',
              visibility: isActive ? 'visible' : 'hidden',
            }}
          />
        </ListItemButton>
      )}
    </ViewListRoot>
  );
};

const ViewListInSide: FC = () => {
  const tableId = useContext(TableIdContext);

  const viewIds = useRecoilValue(table.viewIds(tableId));

  const views = useRecoilValue(view.views([...viewIds]));

  const lastUsedViewId = useRecoilValue(table.lastUsedViewId(tableId));

  const restEditState = useRecoilCallback(({ reset }) => (id: string) => {
    reset(isViewEditState(id));
  });

  const { groupedOptions, getInputProps } = useAutocomplete({
    getOptionLabel: (option) =>
      typeof option == 'string' ? option : option.name,
    options: views,
    id: 'view-list-search',
    filterOptions: filterSearchValue,
    freeSolo: true,
    open: true,
  });

  useEffect(() => {
    return () => {
      views.map((views) => restEditState(views.id));
    };
  }, []);

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
            <ViewList viewData={viewItem} key={viewItem.id} />
          ))}
      </List>
    </ViewListInSideRoot>
  );
};

export default ViewListInSide;

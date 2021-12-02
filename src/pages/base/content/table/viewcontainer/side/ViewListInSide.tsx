import { usePopover } from '@/core/hooks';
import filterSearchValue from '@/core/util/filterSearchValue';
import { EDITTABLE, EDITVIEW, table, useDispath } from '@/domain';
import { ViewData, ViewType } from '@/domain/types';
import { view } from '@/domain/view/view.repository';
import EditViewMenu from '@/pages/base/content/table/viewcontainer/side/EditViewMenu';
import useDoubleClickToEdit from '@hooks/useDoubleClickToEdit';
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
import {
  FC,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  SyntheticEvent,
  useContext,
  useRef,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentEditViewIdState,
  currentViewIdState,
  TableIdContext,
} from '../../TableContext';

const ViewListInSideRoot = styled('div')({
  display: 'flex',
  minHeight: '144px',
  flexDirection: 'column',
  flex: 'auto',
  paddingTop: '0.5rem',
  overflow: 'auto',
});

const ViewItemNode = styled('div')({
  display: 'flex',
  flex: 'auto',
  overflow: 'hidden',
});

const ViewList: FC<{
  viewData: ViewData;
  openMenu: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => void;
  idRef: MutableRefObject<{ id: string; name: string }>;
}> = ({ viewData, openMenu, idRef }) => {
  const [currentViewId, setCurrentViewId] = useRecoilState(currentViewIdState);

  const { isEdit, handleKeyboardEnter, handleToEdit, handleDoubleClick } =
    useDoubleClickToEdit(
      viewData.id,
      viewData.name,
      EDITVIEW,
      currentEditViewIdState,
    );

  const { run } = useDispath(EDITTABLE, { manual: true });

  const isActive = currentViewId === viewData.id;
  const tableId = useContext(TableIdContext);

  return isEdit ? (
    <InputBase
      required
      autoFocus
      defaultValue={viewData.name}
      onBlur={(e) => {
        handleToEdit(e as SyntheticEvent<HTMLInputElement>);
      }}
      onFocus={(e) => {
        e.currentTarget.select();
      }}
      startAdornment={
        <ViewIcon type={viewData.type} sx={{ marginRight: '0.5rem' }} />
      }
      sx={{
        lineHeight: 1.25,
        padding: '0.5rem',
        height: '32px',
        width: '100%',
        borderColor: 'rgba(0,0,0,0.25)',
        borderRadius: '3px',
        borderStyle: 'solid',
        borderWidth: '2px',
        '& .MuiInputBase-input': {
          padding: '0 2px',
          margin: '0 -4px',
        },
      }}
      onKeyUp={handleKeyboardEnter}
    />
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
      onClick={(e) => {
        e.stopPropagation();
        run({
          path: { id: tableId },
          data: { selected_view_id: viewData.id },
        }).then();
        if (!isActive) setCurrentViewId(viewData.id);
      }}
      onDoubleClick={handleDoubleClick}
    >
      <ViewIcon type={viewData.type} sx={{ marginRight: '0.5rem' }} />
      <ViewItemNode>
        <Typography
          sx={{
            flex: 'auto',
            textOverflow: 'ellipsis',
            fontSize: '14px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
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
          onClick={(e) => {
            e.stopPropagation();
            idRef.current = { id: viewData.id, name: viewData.name };
            openMenu(e);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
          }}
        />
        <BoldCheckIcon
          sx={{
            fontSize: '13px',
            flex: 'none',
            visibility: isActive ? 'visible' : 'hidden',
          }}
        />
      </ViewItemNode>
    </ListItemButton>
  );
};

const ViewListInSide: FC = () => {
  const tableId = useContext(TableIdContext);

  const viewIds = useRecoilValue(table.viewIds(tableId));

  const views = useRecoilValue(view.views([...viewIds]));

  const { groupedOptions, getInputProps } = useAutocomplete({
    getOptionLabel: (option) =>
      typeof option == 'string' ? option : option.name,
    options: views,
    id: 'view-list-search',
    filterOptions: filterSearchValue,
    freeSolo: true,
    open: true,
  });

  const { anchorElem, openPopover, closePopover } = usePopover();

  const viewIdRef = useRef({ id: '', name: '' });

  const gridViewNumber = views.filter(
    (view) => view.type === ViewType.grid,
  ).length;

  return (
    <ViewListInSideRoot className="scrollbar">
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
            <ViewList
              viewData={viewItem}
              key={viewItem.id}
              openMenu={openPopover}
              idRef={viewIdRef}
            />
          ))}
      </List>
      <EditViewMenu
        anchorElem={anchorElem as Element}
        closePopover={closePopover}
        viewId={viewIdRef.current.id}
        gridViewNumber={gridViewNumber}
        viewName={viewIdRef.current.name}
      />
    </ViewListInSideRoot>
  );
};

export default ViewListInSide;

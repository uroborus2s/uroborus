import { table } from '@/domain';
import { view } from '@/domain/view/view.repository';
import { TableIdContext, ViewSiderToggleState } from '../TableContext';
import EditIcon from '@ibr/ibr-icon/EditIcon';
import Button from '@mui/material/Button';
import styled from '@mui/styles/styled';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const ViewBarRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  height: '46px',
  whiteSpace: 'nowrap',
  boxShadow: 'rgb(200 200 200) 0 2px 0 0',
  flex: 'none',
});

export const ViewSwitcherContainer = styled('div')({
  display: 'flex',
  flex: 'none',
  paddingLeft: '0.75rem',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '0.5rem',
});

export const ViewSidebarToggleButton = styled(Button)({
  padding: '0 9px',
  height: '30px',
  backgroundColor: 'rgba(0,0,0,0.05)',
  border: '2px solid transparent',
  color: 'hsl(0,0%,20%)',
  fontWeight: 400,
  '&:hover': {
    border: '2px solid rgba(0,0,0,0.1)',
  },
});

export const ViewCollaborationButton = styled(Button)({});

export const ViewConfigContainer = styled('div')({});

export const SearchButton = styled('div')({});

const ViewBar = () => {
  const tableId = useContext(TableIdContext);
  const [toggle, setToggle] = useRecoilState(ViewSiderToggleState);

  const viewId = useRecoilValue(table.lastUsedViewId(tableId));

  const viewName = useRecoilValue(view.name(viewId));

  const viewType = useRecoilValue(view.type(viewId));

  if (!viewName) return null;

  return (
    <ViewBarRoot id="view-bar">
      <ViewSwitcherContainer id="switcher-view">
        <ViewSidebarToggleButton
          id="view-toggle-button"
          variant="outlined"
          startIcon={<EditIcon />}
        >
          折叠
        </ViewSidebarToggleButton>
        <ViewCollaborationButton>{viewName}</ViewCollaborationButton>
      </ViewSwitcherContainer>
      <ViewConfigContainer></ViewConfigContainer>
      <SearchButton></SearchButton>
    </ViewBarRoot>
  );
};

export default ViewBar;

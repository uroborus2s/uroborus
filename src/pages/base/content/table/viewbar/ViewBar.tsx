import { table } from '@/domain';
import { view } from '@/domain/view/view.repository';
import Typography from '@mui/material/Typography';
import CollaborationEndIcon from './CollaborationEndIcon';
import { CollapseIcon, SpreadIcon } from '@ibr/ibr-icon/SpreadAndCollapse';
import ViewIcon from '@ibr/ibr-icon/ViewIcon';
import Button from '@mui/material/Button';
import styled from '@mui/styles/styled';
import { FC, HTMLAttributes, useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TableIdContext, ViewSiderToggleState } from '../TableContext';

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
  marginRight: '0.5rem',
  '& .MuiButton-startIcon': {
    marginRight: '4px',
    '&> *:nth-of-type(1)': {
      fontSize: '14px',
    },
  },
  '&:hover': {
    border: '2px solid rgba(0,0,0,0.1)',
  },
});

export const ViewCollaborationButton = styled(Button)({
  padding: '0 0.5rem',
  height: '30px',
  margin: '0 0.5rem',
  border: 'none',
  color: 'hsl(0,0%,20%)',
  fontSize: '15px',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.05)',
    border: 'none',
  },
  '& .MuiButton-startIcon': {
    marginRight: '4px',
    '&> *:nth-of-type(1)': {
      fontSize: '18px',
    },
  },
});

export const ViewConfigContainer = styled('div')({});

export const SearchButton = styled('div')({});

const ViewBar: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const tableId = useContext(TableIdContext);

  const [toggle, setToggle] = useRecoilState(ViewSiderToggleState);

  const viewId = useRecoilValue(table.lastUsedViewId(tableId));

  const viewName = useRecoilValue(view.name(viewId));

  const viewType = useRecoilValue(view.type(viewId));

  if (!viewName) return null;

  return (
    <ViewBarRoot {...props}>
      <ViewSwitcherContainer id="switcher-view">
        <ViewSidebarToggleButton
          disableRipple
          onClick={() => {
            setToggle((prevState) => !prevState);
          }}
          id="view-toggle-button"
          variant="outlined"
          startIcon={toggle ? <SpreadIcon /> : <CollapseIcon />}
        >
          {toggle ? '折叠' : '展开'}
        </ViewSidebarToggleButton>
        <ViewCollaborationButton
          variant="outlined"
          startIcon={<ViewIcon type={viewType} />}
          endIcon={<CollaborationEndIcon />}
        >
          <Typography
            sx={{
              maxWidth: '8rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {viewName}
          </Typography>
        </ViewCollaborationButton>
      </ViewSwitcherContainer>
      <ViewConfigContainer></ViewConfigContainer>
      <SearchButton></SearchButton>
    </ViewBarRoot>
  );
};

export default ViewBar;

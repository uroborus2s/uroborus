import { usePopover } from '@/core/hooks';
import { EDITVIEW } from '@/domain';
import { view } from '@/domain/view/view.repository';
import EditDescripton from '@ibr/edit-description/EditDescripton';
import { CollapseIcon, SpreadIcon } from '@ibr/ibr-icon/SpreadAndCollapse';
import ViewIcon from '@ibr/ibr-icon/ViewIcon';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import styled from '@mui/styles/styled';
import {
  FC,
  HTMLAttributes,
  MouseEvent,
  RefObject,
  SyntheticEvent,
  useRef,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentViewIdState, ViewSiderToggleState } from '../TableContext';
import CollaborationEndIcon from './CollaborationEndIcon';
import useViewInputState from './useViewInputState';
import ViewButtonGroup from './ViewButtonGroup';
import ViewMenu from './ViewMenu';

export const ViewBarRoot = styled('div')({
  display: 'flex',
  position: 'relative',
  height: '46px',
  whiteSpace: 'nowrap',
  boxShadow: 'rgb(200 200 200) 0 2px 0 0',
  flex: 'none',
  alignItems: 'center',
  zIndex: 99,
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

export const ViewInput = styled(InputBase)({
  padding: '0 0.5rem',
  height: '30px',
  margin: '0 0.5rem',
  borderColor: 'rgba(0,0,0,0.25)',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderTopLeftRadius: '3px',
  borderTopRightRadius: '3px',
  '& .MuiInputBase-input': {
    textAlign: 'center',
  },
});

export const SearchButton = styled('div')({});

const ViewBar: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const [toggle, setToggle] = useRecoilState(ViewSiderToggleState);

  const viewId = useRecoilValue(currentViewIdState);

  const viewName = useRecoilValue(view.name(viewId));

  const viewType = useRecoilValue(view.type(viewId));

  const desValue = useRecoilValue(view.desc(viewId));

  const { anchorElem, openPopover, closePopover } = usePopover();

  const { isEdit, handleDoubleClick, handleToEdit, handleKeyboardEnter } =
    useViewInputState(viewId, viewName);

  const {
    anchorElem: infoElem,
    openPopover: openEditInfo,
    closePopover: closeEditInfo,
  } = usePopover();

  const infoElemRef = useRef<HTMLElement>();

  const handleOpenEditInfo = (event: MouseEvent<HTMLElement>) => {
    if (openEditInfo) openEditInfo(event, infoElemRef);
  };

  if (!viewName) return null;

  // @ts-ignore
  return (
    <>
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
          {isEdit ? (
            <ViewInput
              autoFocus
              required
              defaultValue={viewName}
              onBlur={(e) => {
                handleToEdit(e as SyntheticEvent<HTMLInputElement>);
              }}
              onKeyUp={handleKeyboardEnter}
            />
          ) : (
            <ViewCollaborationButton
              variant="outlined"
              startIcon={<ViewIcon type={viewType} />}
              endIcon={<CollaborationEndIcon />}
              onClick={(e) => {
                e.stopPropagation();
                openPopover(e);
              }}
              ref={infoElemRef as RefObject<HTMLButtonElement>}
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
              <Tooltip title={desValue}>
                <InfoIcon
                  sx={{
                    fontSize: '12px',
                    opacity: 0.5,
                    display: desValue ? 'inline-flex' : 'none',
                    margin: '0.25rem',
                    '&:hover': { opacity: 1 },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // @ts-ignore
                    openEditInfo(e, infoElemRef);
                  }}
                />
              </Tooltip>
            </ViewCollaborationButton>
          )}
        </ViewSwitcherContainer>
        <ViewButtonGroup />
        <SearchButton />
      </ViewBarRoot>
      <ViewMenu
        anchorElem={anchorElem}
        closePopover={closePopover}
        reName={handleDoubleClick}
        openEditInfo={handleOpenEditInfo}
      />
      <EditDescripton
        id={viewId}
        name={viewName}
        desc={desValue}
        anchorElem={infoElem}
        closePopover={closeEditInfo}
        commandType={EDITVIEW}
      />
    </>
  );
};

export default ViewBar;

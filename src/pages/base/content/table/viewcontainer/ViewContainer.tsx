import ViewListInSide from './ViewListInSide';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Property } from 'csstype';
import { FC, HTMLAttributes, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ViewSiderToggleState } from '../../table/TableContext';
import useDragResizeLine from './useDragResizeLine';
import useSuspendedBlock from './useSuspendedBlock';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface StylesProps {
  width: Property.Width;
  top: Property.Top;
}

const useStyles = makeStyles({
  viewContainer: () => ({
    flex: 'auto',
    display: 'flex',
  }),
  viewSide: (props: StylesProps) => ({
    flex: 'none',
    width: props.width,
    borderTop: '2px solid transparent',
    display: 'flex',
    overflow: 'hidden',
  }),
  viewSideBar: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  sideResizeBar: {
    cursor: 'ew-resize',
    marginLeft: '-4px',
    width: '6px',
    position: 'relative',
    '& > .sidebar-resize-bar-inner': {
      marginLeft: '2px',
      backgroundColor: 'rgba(77,77,77,0.3)',
      width: '2px',
      height: '100%',
      position: 'relative',
    },
    '&:hover > .sidebar-resize-bar-inner': {
      backgroundColor: 'rgba(77,77,77,0.5)',
    },
  },
  suspendBlock: (props) => ({
    top: props.top,
    left: '-2px',
    position: 'absolute',
    height: '26px',
    width: '6px',
    backgroundColor: 'rgb(45,127,249)',
    pointerEvents: 'none',
    borderRadius: '10px',
  }),
  view: {
    flex: 'auto',
  },
});

const ViewContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const display = useRecoilValue(ViewSiderToggleState);

  const { show, rect, handleMouseEnter, handleMouseLeave, handleMouseMove } =
    useSuspendedBlock();

  const { width, handleMousedown, handleMouseUp, handleMoveToResize, isMove } =
    useDragResizeLine();

  const classes = useStyles({
    width: `${width}px`,
    top: `${rect}px`,
  });

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMoveToResize);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMoveToResize);
    };
  }, []);

  return (
    <div className={classes.viewContainer} {...props}>
      {display && (
        <div className={classes.viewSide} id="view-side">
          <div className={classes.viewSideBar}>
            <ViewListInSide />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div
            className={classes.sideResizeBar}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMousedown}
          >
            <div className="sidebar-resize-bar-inner">
              {(show || isMove.current) && (
                <div className={classes.suspendBlock} />
              )}
            </div>
          </div>
        </div>
      )}
      <div className={classes.view} id="view"></div>
    </div>
  );
};

export default ViewContainer;
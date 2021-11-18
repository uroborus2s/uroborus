import MoveableDivider from '@ibr/ibr-moveable-divider/MoveableDivider';
import makeStyles from '@mui/styles/makeStyles';
import { Property } from 'csstype';
import { FC, HTMLAttributes, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  currentEditViewIdState,
  ViewSiderToggleState,
} from '../../table/TableContext';
import CreatView from './side/CreatView';
import ViewListInSide from './side/ViewListInSide';
import useDragResizeLine from './useDragResizeLine';
import ViewPaneContainer from './view/ViewPaneContainer';

interface StylesProps {
  width: Property.Width;
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
});

const ViewContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const display = useRecoilValue(ViewSiderToggleState);

  const { width, handleMousedown, handleMouseUp, handleMoveToResize, isMove } =
    useDragResizeLine();

  const classes = useStyles({
    width: `${width}px`,
  });

  const resetEditState = useResetRecoilState(currentEditViewIdState);

  useEffect(() => {
    document.addEventListener('mousemove', handleMoveToResize);

    return () => {
      document.removeEventListener('mousemove', handleMoveToResize);
    };
  }, []);

  useEffect(
    () => () => {
      resetEditState();
    },
    [],
  );

  return (
    <div className={classes.viewContainer} {...props}>
      {display && (
        <div className={classes.viewSide} id="view-side">
          <div className={classes.viewSideBar}>
            <ViewListInSide />
            <CreatView />
          </div>
          <MoveableDivider />
        </div>
      )}
      <ViewPaneContainer />
    </div>
  );
};

export default ViewContainer;

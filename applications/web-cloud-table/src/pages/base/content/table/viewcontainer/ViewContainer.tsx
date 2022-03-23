import { useRafState } from '@/core/hooks';
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
import ViewPaneContainer from './view/ViewPaneContainer';

interface StylesProps {
  width: Property.Width;
}

const useStyles = makeStyles({
  viewContainer: () => ({
    flex: 'auto',
    display: 'flex',
    overflow: 'hidden',
  }),
  viewSide: (props: StylesProps) => ({
    flex: 'none',
    width: props.width,
    borderTop: '2px solid transparent',
    display: 'flex',
    overflow: 'hidden',
  }),
  viewSideBar: (props: StylesProps) => ({
    flex: 'none',
    borderTop: '2px solid transparent',
    display: 'flex',
    flexDirection: 'column',
    width: props.width,
  }),
  dragRoot: {
    marginRight: '-3px',
    cursor: 'ew-resize',
  },
  dragPress: { cursor: 'ew-resize' },
});

const ViewContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const display = useRecoilValue(ViewSiderToggleState);

  const [width, setWidth] = useRafState(403);

  const handleResize = (event: MouseEvent) => {
    const viewElem = document.getElementById('view-container');
    if (viewElem) {
      const left = viewElem.getBoundingClientRect().left;
      const width = event.pageX - left;
      if (width >= 182 && width <= 602) setWidth(width);
    }
  };

  const classes = useStyles({
    width: `${width}px`,
  });

  const resetEditState = useResetRecoilState(currentEditViewIdState);

  useEffect(
    () => () => {
      resetEditState();
    },
    [],
  );

  return (
    <div className={classes.viewContainer} {...props}>
      {display && (
        <>
          <div className={classes.viewSideBar} id="view-side">
            <ViewListInSide />
            <CreatView />
          </div>
          <MoveableDivider
            classes={{ root: classes.dragRoot, press: classes.dragPress }}
            onDiverDragEnd={handleResize}
          />
        </>
      )}
      <ViewPaneContainer />
    </div>
  );
};

export default ViewContainer;

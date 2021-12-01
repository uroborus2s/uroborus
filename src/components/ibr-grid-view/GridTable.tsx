import {
  GridScrollDispatch,
  rowAddHoverState,
  GridScrollTop,
  GridScrollLeft,
} from './Context';
import ScrollOverlay from '@ibr/ibr-grid-view/ScrollOverlay';
import useOnWellScroll from '@ibr/ibr-grid-view/useOnWellScroll';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import composeClasses from '@mui/core/composeClasses';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import styled from '@mui/material/styles/styled';
import useForkRef from '@mui/material/utils/useForkRef';
import classNames from 'classnames';
import {
  forwardRef,
  ForwardRefRenderFunction,
  LegacyRef,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useRecoilCallback } from 'recoil';
import {
  getGridTableUtilityClass,
  GridTableComponentName,
} from './GridClasses';
import GridContainer from './GridContainer';
import SummaryBarContainer from './SummaryBarContainer';
import { IbrGridProps } from './types';

const useUtilityClasses = (ownerState: IbrGridProps) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
    dragDiver: ['dragDiver'],
    dragDiverPress: ['dragDiverPress'],
  };
  return composeClasses(slots, getGridTableUtilityClass, classes);
};

const GridRoot = styled('div', { name: GridTableComponentName, slot: 'Root' })({
  position: 'relative',
  height: '100%',
  zIndex: 4,
  userSelect: 'none',
});

const GridTable: ForwardRefRenderFunction<HTMLElement, IbrGridProps> = (
  props,
  ref,
) => {
  const { className, ...rootProps } = props;
  const eGui = useRef();

  const classes = useUtilityClasses(props);

  const resetScrollState = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(rowAddHoverState);
      },
    [],
  );

  useEffect(() => resetScrollState, []);

  const { handleOnWell, isScrolling } = useOnWellScroll();

  const gridRef = useRef<HTMLDivElement>();

  const handleGridRef = useForkRef(ref, gridRef);

  //onWheel事件，当滑动滚轮时，委派给子元素当onscroll事件
  useEffect(() => {
    gridRef.current?.addEventListener('wheel', handleOnWell);

    return () => {
      gridRef.current?.removeEventListener('wheel', handleOnWell);
    };
  }, []);

  const [gridScrollOffset, dispatch] = useReducer(scrollReducer, {
    top: 0,
    left: 0,
  });

  return (
    <GridRoot
      className={classNames(className, classes.root)}
      ref={handleGridRef as LegacyRef<HTMLDivElement>}
      {...rootProps}
    >
      <GridScrollDispatch.Provider value={dispatch}>
        <GridScrollTop.Provider value={gridScrollOffset.top}>
          <GridScrollLeft.Provider value={gridScrollOffset.left}>
            <ScrollOverlay
              style={{ pointerEvents: isScrolling.current ? 'auto' : 'none' }}
            />
            <GridContainer />
            <SummaryBarContainer />
          </GridScrollLeft.Provider>
        </GridScrollTop.Provider>
      </GridScrollDispatch.Provider>
      <Tooltip title="新增记录" placement="right-start">
        <Fab
          sx={{
            position: 'absolute',
            left: '8px',
            bottom: '19px',
            width: '28px',
            height: '28px',
            zIndex: '4',
            backgroundColor: '#fbfbfb',
            minHeight: 0,
          }}
          disableRipple
        >
          <AddIcon sx={{ fontSize: '16px' }} />
        </Fab>
      </Tooltip>
    </GridRoot>
  );
};

export default forwardRef(GridTable);

const scrollReducer = (
  state: { top: number; left: number },
  action: { type: 'left' | 'top'; offset: number },
) => {
  if (action.type === 'left') {
    return { ...state, left: action.offset };
  } else {
    return { ...state, top: action.offset };
  }
};

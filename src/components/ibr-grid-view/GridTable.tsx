import { gridScrollLeft, gridScrollTop } from '@ibr/ibr-grid-view/Context';
import ScrollOverlay from '@ibr/ibr-grid-view/ScrollOverlay';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import composeClasses from '@mui/core/composeClasses';
import { Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import {
  forwardRef,
  ForwardRefRenderFunction,
  LegacyRef,
  useEffect,
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
        reset(gridScrollTop);
        reset(gridScrollLeft);
      },
    [],
  );

  useEffect(() => resetScrollState, []);

  return (
    <GridRoot
      className={classNames(className, classes.root)}
      ref={ref as LegacyRef<HTMLDivElement>}
      {...rootProps}
    >
      <ScrollOverlay />
      <GridContainer />
      <SummaryBarContainer />
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

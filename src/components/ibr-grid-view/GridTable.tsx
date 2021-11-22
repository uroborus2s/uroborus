import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import AddIcon from '@ibr/ibr-icon/AddIcon';
import { Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import {
  defaultColumnHeaderHight,
  defaultRowHight,
  GridStateContext,
  rowNumberWidth,
} from './Context';
import SummaryBarContainer from './SummaryBarContainer';
import composeClasses from '@mui/core/composeClasses';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import { forwardRef, ForwardRefRenderFunction, LegacyRef, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  getGridTableUtilityClass,
  GridTableComponentName,
} from './GridClasses';
import GridContainer from './GridContainer';
import { IbrGridProps, OwnerStateType } from './types';

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

  const viewId = useRecoilValue(currentViewIdState);

  const forzenWidth = useRecoilValue(view.frozenWidth(viewId));

  const ownerState: OwnerStateType = {
    fixedColumnWidth: forzenWidth + rowNumberWidth,
    columnHeaderHight: defaultColumnHeaderHight,
    rowHight: defaultRowHight,
  };

  return (
    <GridRoot
      className={classNames(className, classes.root)}
      ref={ref as LegacyRef<HTMLDivElement>}
      {...rootProps}
    >
      <GridStateContext.Provider value={ownerState}>
        <GridContainer />
        <SummaryBarContainer />
        <Tooltip title="新增记录" placement="right-start">
          <Fab
            sx={{
              position: 'absolute',
              left: '12px',
              bottom: '18px',
              width: '30px',
              height: '30px',
              zIndex: '4',
              backgroundColor: '#fbfbfb',
              minHeight: 0,
            }}
            disableRipple
          >
            <AddIcon sx={{ fontSize: '16px' }} />
          </Fab>
        </Tooltip>
      </GridStateContext.Provider>
    </GridRoot>
  );
};

export default forwardRef(GridTable);

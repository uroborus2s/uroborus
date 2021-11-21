import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import { useRecoilValue } from 'recoil';
import {
  getGridTableUtilityClass,
  GridTableComponentName,
} from './GridClasses';
import GridContainer from './GridContainer';
import composeClasses from '@mui/core/composeClasses';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import { forwardRef, ForwardRefRenderFunction, LegacyRef, useRef } from 'react';
import {
  defaultColumnHeaderHight,
  GridStateContext,
  IbrGridProps,
  OwnerStateType,
} from './types';

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
    fixedColumnWidth: `${forzenWidth + 66}px`,
    columnHeaderHight: defaultColumnHeaderHight,
  };

  return (
    <GridRoot
      className={classNames(className, classes.root)}
      ref={ref as LegacyRef<HTMLDivElement>}
      {...rootProps}
    >
      <GridStateContext.Provider value={ownerState}>
        <GridContainer />
      </GridStateContext.Provider>
    </GridRoot>
  );
};

export default forwardRef(GridTable);

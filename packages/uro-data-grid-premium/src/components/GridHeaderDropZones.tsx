import { FC, memo } from 'react';
import {
  composeClasses,
  getDataGridUtilityClass,
  gridComponentName,
  GridOptions,
  gridOptionsWrapperAtom,
  styled,
} from '@uroborus/grid-core';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import useDragService from '@uroborus/grid-core/src/hooks/useDragService';

type OwnerState = {
  classes: GridOptions['classes'];
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['columnDropWrapper'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const GridHeaderDropZonesRoot = styled('div', {
  name: gridComponentName,
  slot: 'HeaderDrop',
  overridesResolver: (props, styles) => styles.headerDrop,
})(() => ({
  display: 'flex',
}));

const GridHeaderDropZones: FC = () => {
  const gridWrapOptions = useRecoilValue(gridOptionsWrapperAtom);

  const ownerState: OwnerState = { classes: gridWrapOptions?.getClasses() };
  const classes = useUtilityClasses(ownerState);

  const RowGroupDropZonePanel = gridWrapOptions!.getStackComponents(
    'rowGroupDropZonePanel',
  );

  return (
    <GridHeaderDropZonesRoot role="presentation" className={classes.root}>
      <RowGroupDropZonePanel />
    </GridHeaderDropZonesRoot>
  );
};

export default memo(GridHeaderDropZones);

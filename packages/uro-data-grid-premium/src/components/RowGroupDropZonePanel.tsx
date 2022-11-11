import { FC, memo, PropsWithChildren, RefObject } from 'react';
import { composeClasses, getDataGridUtilityClass } from '@uroborus/grid-core';
import useRowGroupDropZone, { TDropZone } from '../hooks/useRowGroupDropZone';

export interface RowGroupDropZonePanelProps {
  horizontal: boolean;
  dropZonePurpose: TDropZone;
}

type OwnerState = { classes: any };

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['toolbarContainer', 'disabled', 'gridFocusManaged'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const RowGroupDropZonePanel: FC<
  PropsWithChildren<RowGroupDropZonePanelProps>
> = ({ horizontal, dropZonePurpose }) => {
  const {
    eColumnDropListRef,
    eFocusableRef,
    onKeyDownHandler,
    classes: classesProps,
  } = useRowGroupDropZone(horizontal, dropZonePurpose);

  const classes = useUtilityClasses({
    classes: classesProps,
  });

  return (
    <div
      role="presentation"
      ref={eFocusableRef as RefObject<HTMLDivElement>}
      onKeyDown={onKeyDownHandler}
      className={classes.root}
    >
      <div role="listbox" ref={eColumnDropListRef as RefObject<HTMLDivElement>}>
        <div aria-hidden />
      </div>
    </div>
  );
};

export default memo(RowGroupDropZonePanel);

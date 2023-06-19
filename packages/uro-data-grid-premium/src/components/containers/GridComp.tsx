import { CSSProperties, memo, Ref, useRef } from 'react';
import composeClasses from '@mui/utils/composeClasses';
import TabGuardComp from 'src/components/TabGuardComp';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useRecoilValue } from 'recoil';
import { getDataGridUtilityClass, gridComponentName, styled } from '@/styles';
import { useGridComp } from '@/hooks';
import { GridOptions } from '@/entity/props/gridOptions';
import { GridProps } from '@/entity/props';
import { GridSizeChangedEvent } from '@/entity/types/enevtType';
import { EVENTS } from '@/entity/eventKey';
import { useReSize } from '../../../../uro-sense';
import { gridContext } from '@/hooks/core/useCreatContext';

type OwnerState = {
  classes: GridProps['classes'];
  layoutClasses: GridOptions['domLayout'];
  isKeyboardFocus: boolean;
  isRtl: boolean;
} & CSSProperties;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, layoutClasses, isKeyboardFocus, isRtl } = ownerState;

  const slots = {
    root: [
      'main',
      layoutClasses,
      isKeyboardFocus && 'keyboardFocus',
      isRtl && 'rlt',
    ],
  };

  return composeClasses(
    slots,
    getDataGridUtilityClass,
    classes as Record<string, string>,
  );
};

const GridCompStyles = styled('div', {
  name: gridComponentName,
  slot: 'Main',
  overridesResolver: (props, styles) => styles.main,
})<{ ownerState: CSSProperties }>(({ theme, ownerState }) => ({
  userSelect: ownerState.userSelect,
  cursor: ownerState.cursor,
  WebkitUserSelect: ownerState.userSelect,
}));

const GridComp = () => {
  const { eventBus } = useRecoilValue(gridContext)!;

  const onResize = ({
    width,
    height,
  }: {
    width: number | undefined;
    height: number | undefined;
  }) => {
    const event: GridSizeChangedEvent = {
      type: EVENTS.EVENT_GRID_SIZE_CHANGED,
      clientWidth: width || 0,
      clientHeight: height || 0,
    };
    eventBus.dispatchEvent(event);
  };

  const eRootLoaclRef = useRef<HTMLDivElement>();

  const { ref: eResizeRef } = useReSize({
    onResize,
  });

  const eRootRef = useForkRef(eRootLoaclRef, eResizeRef);

  return (
    <div>
      <TabGuardComp>
        <GridComp />
      </TabGuardComp>
    </div>
  );
};

export default memo(GridComp);

import { FC, memo, Ref, useRef } from 'react';
import composeClasses from '@mui/utils/composeClasses';
import { getDataGridUtilityClass, gridComponentName, styled } from '@/styles';
import { GridOptions } from '@/entity/props/gridOptions';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { gridContext } from '@/hooks/core/useCreatContext';

type OwnerState = {
  classes: GridOptions['classes'];
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['status-bar'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

const StatusBarStyles = styled('div', {
  name: gridComponentName,
  slot: 'StatusBar',
  overridesResolver: (props, styles) => styles.statusBar,
})(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  overflow: 'hidden',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  borderTopColor: 'hsl(202,10%,88%)',
  borderColor: 'inherit',
  backgroundColor: 'hsla(0,0%,100%,0.5)',
  lineHeight: '1.5',
}));

const StatusBar: FC = () => {
  const gridWrapOptions = useRecoilValue(gridContext);

  const statusPanels = gridWrapOptions?.getStatusPanels();

  const xStatusBarLeftRef = useRef<HTMLDivElement>();

  const xStatusBarCenter = useRef<HTMLDivElement>();

  const xStatusBarRight = useRef<HTMLDivElement>();

  const ownerState = {};

  const classes = useUtilityClasses({ classes: gridWrapOptions!.getClasses() });

  return (
    statusPanels && (
      <StatusBarStyles className={classes.root}>
        <div
          ref={xStatusBarLeftRef as Ref<HTMLDivElement>}
          className={classNames(`${gridComponentName}-left-pane-wrapper`)}
        />
        <div ref={xStatusBarCenter as Ref<HTMLDivElement>} />
        <div ref={xStatusBarRight as Ref<HTMLDivElement>} />
      </StatusBarStyles>
    )
  );
};

export default memo(StatusBar);

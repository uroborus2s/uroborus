import { useRafState } from '@/core/hooks';
import useRefState from '@/core/hooks/useRefState';
import { VariablesizelistClasses } from '@ibr/ibr-virtual-list/variablesizelistClasses';
import composeClasses from '@mui/core/composeClasses';
import { Theme } from '@mui/material/styles/createTheme';
import styled from '@mui/material/styles/styled';
import Tooltip from '@mui/material/Tooltip';
import { TooltipProps } from '@mui/material/Tooltip/Tooltip';
import makeStyles from '@mui/styles/makeStyles';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import classNames from 'classnames';
import {
  ElementType,
  FC,
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import {
  getMoveableDividerUtilityClass,
  MoveableDividerCommponentName,
} from './moveableDividerClasses';

interface InStateProps {
  classes?: Partial<VariablesizelistClasses>;
  top: number;
}

interface MoveableDividerProps extends HTMLAttributes<HTMLElement> {
  component?: ElementType;
  classes?: Partial<VariablesizelistClasses>;
  sx?: SxProps<Theme>;
  //默认为flase
  disabledTooltip?: boolean;
  tooltipProps?: TooltipProps;
}

const useUtilityClasses = (ownerState: InStateProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    paneLine: ['paneLine'],
    dragBlock: ['dragBlock'],
    tooltip: ['tooltip'],
    press: ['press'],
  };

  return composeClasses(slots, getMoveableDividerUtilityClass, classes);
};

const DividerRoot = styled('div', {
  name: MoveableDividerCommponentName,
  slot: 'Root',
  overridesResolver: (props, styles) => [styles.root],
})({
  position: 'relative',
  width: '6px',
  height: '100%',
  overflow: 'visible',
  opacity: 0,
  '&:hover': {
    opacity: 1,
    cursor: 'grabbing',
  },
});

const PaneLine = styled('div', {
  name: MoveableDividerCommponentName,
  slot: 'PaneLine',
  overridesResolver: (props, styles) => [styles.paneLine],
})({
  position: 'absolute',
  left: '2px',
  top: 0,
  height: '100%',
  width: '2px',
  backgroundColor: '#aaa',
  pointerEvents: 'none',
});

const SlideBlock = styled('div', {
  name: MoveableDividerCommponentName,
  slot: 'DragBlock',
  overridesResolver: (props, styles) => [styles.dragBlock],
})<{ ownerState: InStateProps }>(({ ownerState }) => ({
  position: 'absolute',
  left: 0,
  top: ownerState.top,
  borderRadius: '10px',
  width: '6px',
  height: '32px',
  backgroundColor: '#2d7ff9',
  transform: 'translateY(-50%)',
}));

const useStyel = makeStyles({
  press: {
    pointerEvents: 'none',
    cursor: 'move',
  },
});

const MoveableDivider: FC<MoveableDividerProps> = ({
  classes: classesProps,
  children,
  className,
  disabledTooltip = true,
  tooltipProps = { title: '' },
  ...rootProps
}) => {
  const [isPress, setIsPress] = useRefState(false);

  const [position, setPosition] = useRafState(0);

  const ownerState = { classes: classesProps, top: position };

  const classes = useUtilityClasses(ownerState);
  const mClasses = useStyel();

  const handleMouseUp = () => {
    console.log('弹开鼠标');
    if (isPress.current) {
      console.log('滑动模块时执行');
      document.body.classList.remove(mClasses.press);
      document.body.classList.remove(classes.press);
      setIsPress(false);
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log('按住鼠标');
    document.body.classList.add(mClasses.press);
    document.body.classList.add(classes.press);
    setIsPress(true);
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log('移动中');
    const top = event.pageY - event.currentTarget.getBoundingClientRect().top;
    setPosition(top);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      setIsPress(false);
    };
  }, []);

  const slideBlock = (
    <SlideBlock ownerState={ownerState} className={classes.dragBlock} />
  );

  return (
    <DividerRoot
      className={classNames(classes.root, className)}
      {...rootProps}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <PaneLine className={classes.paneLine}>{children}</PaneLine>
      {/*滑动块是否支持提示语*/}
      {disabledTooltip ? (
        <Tooltip {...tooltipProps}>{slideBlock}</Tooltip>
      ) : (
        slideBlock
      )}
    </DividerRoot>
  );
};

export default MoveableDivider;

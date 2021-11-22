import { useRafState } from '@/core/hooks';
import useRefState from '@/core/hooks/useRefState';
import composeClasses from '@mui/core/composeClasses';
import { Theme } from '@mui/material/styles/createTheme';
import styled from '@mui/material/styles/styled';
import Tooltip from '@mui/material/Tooltip';
import { TooltipProps } from '@mui/material/Tooltip/Tooltip';
import makeStyles from '@mui/styles/makeStyles';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import classNames from 'classnames';
import { ElementType, FC, HTMLAttributes, useEffect, useState } from 'react';
import {
  getMoveableDividerUtilityClass,
  MoveableDividerClasses,
  MoveableDividerCommponentName,
} from './moveableDividerClasses';

interface InStateProps {
  classes?: Partial<MoveableDividerClasses>;
  top: number;
  hover?: boolean;
}

interface MoveableDividerProps extends HTMLAttributes<HTMLElement> {
  component?: ElementType;
  classes?: Partial<MoveableDividerClasses>;
  sx?: SxProps<Theme>;
  //默认为flase
  disabledTooltip?: boolean;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  onDiverDragEnd?: (enent: MouseEvent) => void;
  onDragUp?: (enent: MouseEvent) => void;
}

const useUtilityClasses = (ownerState: InStateProps) => {
  const { classes, hover } = ownerState;

  const slots = {
    root: ['root', hover && 'hover'],
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
  zIndex: 9,
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

const OrgPaneLine = styled('div')({
  position: 'absolute',
  left: '3px',
  top: 0,
  height: '100%',
  width: '1px',
  backgroundColor: '#ccc',
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
  container: {
    width: '100%',
    height: '100%',
  },
});

const MoveableDivider: FC<MoveableDividerProps> = ({
  classes: classesProps,
  children,
  className,
  disabledTooltip = true,
  tooltipProps = { title: '' },
  onDiverDragEnd,
  onDragUp,
  ...rootProps
}) => {
  const [isPress, setIsPress] = useRefState(false);

  const [position, setPosition] = useRafState(0);

  const handleMouseUp = (event: MouseEvent) => {
    if (isPress.current) {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.pointerEvents = 'auto';
      }
      document.body.classList.remove(...classes.press.split(' '));
      setIsPress(false);
      setHover(false);
      if (onDragUp) onDragUp(event);
    }
  };

  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    if (!isPress.current) {
      setHover(false);
    }
  };

  const ownerState = { classes: classesProps, top: position, hover };

  const classes = useUtilityClasses(ownerState);
  const mClasses = useStyel();

  const handleDrag = (event: MouseEvent) => {
    if (isPress.current && onDiverDragEnd) onDiverDragEnd(event);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleDrag);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleDrag);

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hover ? (
        <div
          className={mClasses.container}
          onMouseDown={(event) => {
            event.stopPropagation();
            const rootElement = document.getElementById('root');
            if (rootElement) {
              rootElement.style.pointerEvents = 'none';
            }
            document.body.classList.add(...classes.press.split(' '));

            setIsPress(true);
          }}
          onMouseMove={(event) => {
            event.stopPropagation();
            const top =
              event.pageY - event.currentTarget.getBoundingClientRect().top;
            setPosition(top);
          }}
        >
          <PaneLine className={classes.paneLine}>{children}</PaneLine>
          {
            /*滑动块是否支持提示语*/
            disabledTooltip ? (
              <Tooltip {...tooltipProps}>{slideBlock}</Tooltip>
            ) : (
              slideBlock
            )
          }
        </div>
      ) : (
        <OrgPaneLine />
      )}
    </DividerRoot>
  );
};

export default MoveableDivider;

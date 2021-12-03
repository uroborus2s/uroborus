// 当鼠标移动hover状态时，此组件展示
import { StyeldProps } from '@/core/ibr-types';
import ArrowDown from '@ibr/ibr-icon/ArrowDown';
import composeClasses from '@mui/base/composeClasses';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import { ComponentPropsWithRef, FC } from 'react';
import {
  getHoverButtonUtilityClass,
  HoverButtonName,
} from './HoverButtonClasses';

type HoverDropButtonProps = StyeldProps &
  ComponentPropsWithRef<'div'> & { size?: number };

type StateProps = Pick<HoverDropButtonProps, 'size' | 'classes'>;

const useUtilityClasses = (ownerState: StateProps) => {
  const { classes } = ownerState;
  const slots = { root: ['root', 'hover'], icon: ['icon'] };
  return composeClasses(slots, getHoverButtonUtilityClass, classes);
};

const DropButtonRoot = styled('div', {
  name: HoverButtonName,
  slot: 'Root',
})<{ ownerState: StateProps }>(({ ownerState }) => ({
  width: `${ownerState.size}px`,
  height: `${ownerState.size}px`,
  opacity: 0,
  borderRadius: '50%',
  position: 'absolute',
  bottom: 0,
  right: 0,
  cursor: 'pointer',
  transition: 'all 0.085s ease-in',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '0.25rem',
  marginLeft: '0.25rem',
  color: '#fff',
  '&:hover,&:active,&:focus': {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
}));

const HovweDropButton: FC<HoverDropButtonProps> = ({
  classes: classesProps,
  children,
  size = 16,
  className,
  ...props
}) => {
  const ownerState = { classes: classesProps, size: size };
  const classes = useUtilityClasses(ownerState);

  return (
    <DropButtonRoot
      className={classNames(className, classes.root)}
      ownerState={ownerState}
      {...props}
    >
      <ArrowDown
        sx={{ fontSize: `${size * 0.8}px` }}
        className={classes.icon}
      />
    </DropButtonRoot>
  );
};

export default HovweDropButton;

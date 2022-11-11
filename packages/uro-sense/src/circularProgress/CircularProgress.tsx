import { forwardRef } from 'react';
import capitalize from '@mui/utils/capitalize';
import composeClasses from '@mui/utils/composeClasses';
import { useSlotProps } from '@mui/base';
import classNames from 'classnames';
import { css, keyframes } from '@emotion/react';
import {
  CircularProgressOwnerState,
  CircularProgressProps,
} from './CircularProgressProps';
import { styled, useThemeProps } from '../styles';
import {
  componentName,
  getCircularProgressUtilityClass,
} from './circularProgressClasses';

const circulate = keyframes({
  '0%': {
    // let the progress start at the top of the ring
    transform: 'rotate(-90deg)',
  },
  '100%': {
    transform: 'rotate(270deg)',
  },
});

const useUtilityClasses = (ownerState: CircularProgressOwnerState) => {
  const { determinate, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      determinate && 'determinate',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
    ],
    svg: ['svg'],
    track: ['track'],
    progress: ['progress'],
  };

  return composeClasses(slots, getCircularProgressUtilityClass, {});
};

const CircularProgressRoot = styled('span', {
  name: componentName,
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CircularProgressOwnerState }>(({ theme, ownerState }) => {
  const { gap, variant, color: colorProp, circSize } = ownerState;

  const { color, ...rest } = theme.variants[variant!]?.[colorProp!] || {};

  return {
    width: `${circSize}px`,
    height: `${circSize}px`,
    borderRadius: `${circSize}px`,
    margin: typeof gap === 'number' ? `${gap}` : gap,
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color,
    ...(ownerState.children && {
      // only add font related properties when there is a child.
      // so that when there is no child, the size can be controlled by the parent font-size e.g. Link
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.md,
      fontSize: `${0.2 * circSize}px`,
    }),
    ...rest,
  };
});

const CircularProgressSvg = styled('svg', {
  name: componentName,
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg,
})<{ ownerState: CircularProgressOwnerState }>(({ theme }) => ({
  width: 'inherit',
  height: 'inherit',
  display: 'inherit',
  boxSizing: 'inherit',
  position: 'absolute',
  top: `${-theme.border.borderWidth}px`, // centered align
  left: `${-theme.border.borderWidth}px`, // centered align
}));

const CircularProgressTrack = styled('circle', {
  name: componentName,
  slot: 'track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: CircularProgressOwnerState }>(({ ownerState, theme }) => {
  const { variant, color, thickness, circSize } = ownerState;
  const r = (circSize - 2 * theme.border.borderWidth) / 2 - thickness! / 2;

  const { backgroundColor } = theme.variants[variant!]?.[color!] || {};
  return {
    cx: '50%',
    cy: '50%',
    r: `${r}px`,
    fill: 'transparent',
    strokeWidth: `${thickness}px`,
    stroke: backgroundColor,
  };
});

const CircularProgressProgress = styled('circle', {
  name: componentName,
  slot: 'progress',
  overridesResolver: (props, styles) => styles.progress,
})<{ ownerState: CircularProgressOwnerState }>(
  ({ theme, ownerState }) => {
    const {
      variant,
      color: colorProp,
      thickness,
      circSize,
      value,
    } = ownerState;
    const r = (circSize - 2 * theme.border.borderWidth) / 2 - thickness! / 2;
    const { color } = theme.variants[variant!]?.[colorProp!] || {};
    const length = 2 * Math.PI * r;
    const offset = length - (value! * length) / 100;
    return {
      cx: '50%',
      cy: '50%',
      r: `${r}px`,
      fill: 'transparent',
      strokeWidth: `${thickness}`,
      stroke: color,
      strokeLinecap: 'round',
      strokeDasharray: `${length}px`,
      strokeDashoffset: `${offset}px`,
      transformOrigin: 'center',
      transform: 'rotate(-90deg)', // to initially appear at the top-center of the circle.
    };
  },
  ({ ownerState }) =>
    ownerState.determinate
      ? {
          transition:
            'stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', // copy from Material UI CircularProgress
        }
      : css`
          animation: var(
              --CircularProgress-circulation,
              0.5s linear 0s infinite normal none running
            )
            ${circulate};
        `,
);

const CircularProgress = forwardRef<HTMLElement, CircularProgressProps>(
  (inProps, ref) => {
    const props = useThemeProps({
      props: inProps,
      name: 'UroCircularProgress',
    });

    const {
      componentsProps = {},
      component = 'span',
      children,
      className,
      color = 'primary',
      size = 'md',
      variant = 'soft',
      thickness,
      determinate = false,
      gap = 0,
      value = determinate ? 0 : 25, // `25` is the 1/4 of the circle.
      ...other
    } = props;

    let circularSize = 24;
    let trackThickness = 3;
    if (size === 'md') {
      circularSize = 40;
      trackThickness = 6;
    } else if (size === 'lg') {
      circularSize = 64;
      trackThickness = 8;
    }
    if (thickness) trackThickness = thickness;

    const ownerState = {
      ...props,
      color,
      circSize: circularSize,
      size,
      variant,
      thickness: trackThickness,
      value,
      determinate,
      gap,
      instanceSize: inProps.size,
    };

    const classes = useUtilityClasses(ownerState);

    const rootProps = useSlotProps({
      elementType: CircularProgressRoot,
      externalSlotProps: componentsProps.root,
      externalForwardedProps: other,
      ownerState,
      additionalProps: {
        ref,
        as: component,
        role: 'progressbar',
        style: {
          // Setting this CSS varaible via inline-style
          // prevents the generation of new CSS every time
          // `value` prop updates
          '--CircularProgress-percent': value,
        },
      },
      className: classNames(classes.root, className),
      ...(value &&
        determinate && {
          'aria-valuenow':
            typeof value === 'number'
              ? Math.round(value)
              : Math.round(Number(value || 0)),
        }),
    });

    const svgProps = useSlotProps({
      elementType: CircularProgressSvg,
      externalSlotProps: componentsProps.svg,
      ownerState,
      className: classes.svg,
    });

    const trackProps = useSlotProps({
      elementType: CircularProgressTrack,
      externalSlotProps: componentsProps.track,
      ownerState,
      className: classes.track,
    });

    const progressProps = useSlotProps({
      elementType: CircularProgressProgress,
      externalSlotProps: componentsProps.progress,
      ownerState,
      className: classes.progress,
    });

    return (
      <CircularProgressRoot {...rootProps}>
        <CircularProgressSvg {...svgProps}>
          <CircularProgressTrack {...trackProps} />
          <CircularProgressProgress {...progressProps} />
        </CircularProgressSvg>
        {children}
      </CircularProgressRoot>
    );
  },
);

export default CircularProgress;

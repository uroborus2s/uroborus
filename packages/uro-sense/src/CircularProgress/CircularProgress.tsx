import { forwardRef } from 'react';

import { css, keyframes } from '@emotion/react';
import { capitalize, composeClasses } from '@uroborus/core';
import classNames from 'classnames';

import styled, { useSlot, useThemeProps } from '../styles/index.js';

import {
  componentName,
  getCircularProgressUtilityClass,
} from './CircularProgressClasses.js';
import type {
  CircularProgressOwnerState,
  CircularProgressProps,
} from './CircularProgressProps.js';

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
  const { variant, color: colorProp, circSize, thickness } = ownerState;

  const { color, backgroundColor, ...rest } =
    theme.variants[colorProp][variant].normal || {};

  return {
    width: `${circSize}px`,
    height: `${circSize}px`,
    borderRadius: `${circSize}px`,
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color,
    ...(ownerState.children && {
      // only add font related properties when there is a child.
      // so that when there is no child, the size can be controlled by the parent font-size e.g. Link
      fontFamily: theme.fontFamily.body,
      fontWeight: theme.fontWeight.md,
      fontSize: `${0.2 * circSize}px`,
    }),
    ...rest,
    ...(variant === 'outlined' && {
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderRadius: 'inherit',
        top: `${thickness}px`,
        left: `${thickness}px`,
        right: `${thickness}px`,
        bottom: `${thickness}px`,
        ...rest,
      },
    }),
  };
});

const CircularProgressSvg = styled('svg', {
  name: componentName,
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg,
})<{ ownerState: CircularProgressOwnerState }>(({ theme, ownerState }) => {
  const borderWidth =
    theme.variants[ownerState.color][ownerState.variant].variantBorderWidth;
  return {
    width: 'inherit',
    height: 'inherit',
    display: 'inherit',
    boxSizing: 'inherit',
    position: 'absolute',
    top: `${-borderWidth}px`, // centered align
    left: `${-borderWidth}px`,
  }; // centered align
});

const CircularProgressTrack = styled('circle', {
  name: componentName,
  slot: 'track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: CircularProgressOwnerState }>(({ ownerState, theme }) => {
  const { variant, color, thickness, circSize } = ownerState;

  const { backgroundColor } = theme.variants[color][variant].normal || {};
  const borderWidth = theme.variants[color][variant].variantBorderWidth;
  const r = (circSize - 2 * borderWidth - thickness) / 2;
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
    const {
      variantBorderWidth: borderWidth,
      normal: { color },
    } = theme.variants[colorProp][variant];

    const r = (circSize - 2 * borderWidth - thickness) / 2;
    const length = 2 * Math.PI * r;
    const offset = length - (value * length) / 100;
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
      name: componentName,
    });

    const {
      children,
      className,
      color = 'primary',
      size = 'md',
      variant = 'soft',
      thickness,
      determinate = false,
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
    if (typeof thickness === 'number') trackThickness = thickness;

    const ownerState = {
      ...props,
      color,
      circSize: circularSize,
      size,
      variant,
      thickness: trackThickness,
      value,
      determinate,
    };

    const classes = useUtilityClasses(ownerState);

    const [SlotRoot, rootProps] = useSlot('root', {
      ref,
      className: classNames(classes.root, className),
      elementType: CircularProgressRoot,
      externalForwardedProps: other as any,
      ownerState,
      additionalProps: {
        role: 'progressbar',
        ...(value &&
          determinate && {
            'aria-valuenow': Math.round(value),
          }),
      },
    });

    const [SlotSvg, svgProps] = useSlot('svg', {
      className: classes.svg,
      elementType: CircularProgressSvg,
      externalForwardedProps: other as any,
      ownerState,
    });

    const [SlotTrack, trackProps] = useSlot('track', {
      className: classes.track,
      elementType: CircularProgressTrack,
      externalForwardedProps: other as any,
      ownerState,
    });

    const [SlotProgress, progressProps] = useSlot('progress', {
      className: classes.progress,
      elementType: CircularProgressProgress,
      externalForwardedProps: other as any,
      ownerState,
    });

    return (
      <SlotRoot {...rootProps}>
        <SlotSvg {...svgProps}>
          <SlotTrack {...trackProps} />
          <SlotProgress {...progressProps} />
        </SlotSvg>
        {children}
      </SlotRoot>
    );
  },
);

CircularProgress.displayName = 'Uro-CircularProgress';

export default CircularProgress;

import { forwardRef, LegacyRef } from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import {
  componentName,
  getSvgIconUtilityClass,
  SvgIconClassKey,
} from './svgIconClasses';
import { styled, tranThemeColor, useThemeProps } from '@uroborus/styled';
import { unstable_capitalize as capitalize } from '@mui/utils';
import classNames from 'classnames';
import { SvgIconOwnerState, SvgIconProps } from './propd';

const useUtilityClasses = (ownerState: Record<string, unknown>) => {
  const { color, fontSize, classes } = ownerState;

  const slots = {
    root: [
      'root',
      color !== 'inherit' && `color${capitalize(color as string)}`,
      `fontSize${capitalize(fontSize as string)}`,
    ],
  };

  return composeClasses(
    slots,
    getSvgIconUtilityClass,
    classes as Record<SvgIconClassKey, string>,
  );
};

const SvgIconRoot = styled('svg', {
  name: componentName,
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'inherit' &&
        styles[`color${capitalize(ownerState.color)}`],
      styles[`fontSize${capitalize(ownerState.fontSize)}`],
    ];
  },
})<{ ownerState: SvgIconOwnerState }>(({ theme, ownerState }) => ({
  userSelect: 'none',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  fill: 'currentColor',
  flexShrink: 0,
  transition: theme.transitions?.create?.('fill', {
    duration: theme.transitions?.duration?.shorter,
  }),
  fontSize: {
    inherit: 'inherit',
    small: theme.typography?.pxToRem?.(20) || '1.25rem',
    medium: theme.typography?.pxToRem?.(24) || '1.5rem',
    large: theme.typography?.pxToRem?.(35) || '2.1875',
  }[ownerState.fontSize],
  // TODO v5 deprecate, v6 remove for sx
  color: tranThemeColor(theme, ownerState.color),
}));

const SvgIcon = forwardRef<HTMLElement, SvgIconProps>((inProps, ref) => {
  const props = useThemeProps({ props: inProps, name: componentName });
  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
  };

  const more: Record<string, unknown> = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  const classes = useUtilityClasses(ownerState);

  return (
    <SvgIconRoot
      as={component}
      className={classNames(classes.root, className)}
      ownerState={ownerState}
      focusable="false"
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      ref={ref as LegacyRef<SVGSVGElement>}
      {...more}
      {...other}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </SvgIconRoot>
  );
});

SvgIcon.displayName = 'TudSvgIcon';
export default SvgIcon;

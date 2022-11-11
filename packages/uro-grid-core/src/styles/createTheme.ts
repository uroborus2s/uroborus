import {
  createTheme as systemCreateTheme,
  CSSInterpolation,
  Interpolation,
  Theme as SystemTheme,
  ThemeOptions as SystemThemeOptions,
} from '@mui/system';
import { deepmerge } from '@mui/utils';
import createMixins, { Mixins, MixinsOptions } from './createMixins';
import createPalette, { Palette, PaletteOptions } from './createPalette';
import shadows, { Shadows } from './shadows';
import createTransitions, {
  Transitions,
  TransitionsOptions,
} from './createTransitions';
import createTypography, {
  Typography,
  TypographyOptions,
} from './createTypography';
import zIndex, { ZIndex, ZIndexOptions } from './zIndex';
import { GridClassKey } from './classes';

export type ComponentsStyleOverrides<Props = any, Theme = unknown> = Partial<
  Record<
    GridClassKey,
    | CSSInterpolation
    | ((
        props: { ownerState: Props & Record<string, unknown> } & {
          theme: Theme;
        } & Record<string, unknown>,
      ) => CSSInterpolation)
  >
>;

export type ComponentsVariants<Props> = Array<{
  props: Partial<Props>;
  style: Interpolation<{ theme: Theme }>;
}>;

export interface Components<Theme = unknown, Props = any> {
  BuiGrid?: {
    defaultProps?: Props;
    styleOverrides?: ComponentsStyleOverrides<Theme>;
    variants?: ComponentsVariants<Props>;
  };
}

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'> {
  mixins?: MixinsOptions;
  components?: Components<Omit<Theme, 'components'>>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends BaseTheme {
  components?: Components<BaseTheme>;
}

export default function createTheme(
  options?: ThemeOptions,
  ...args: object[]
): Theme {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    ...other
  } = options || {};

  const palette = createPalette(paletteInput);
  const systemTheme = systemCreateTheme(options);
  const mixins = createMixins(
    systemTheme.breakpoints,
    systemTheme.spacing,
    mixinsInput,
  );

  let buiTheme = deepmerge(systemTheme, {
    mixins,
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: { ...zIndex },
  });

  buiTheme = deepmerge(buiTheme, other);
  buiTheme = args.reduce(
    (acc, argument) => deepmerge(acc, argument),
    buiTheme,
  ) as Theme;

  return buiTheme as Theme;
}

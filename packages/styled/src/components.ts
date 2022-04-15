import { ComponentsOverrides } from './overrides';
import { Interpolation } from '@mui/system';
import { Theme as SystemTheme } from '@mui/system/createTheme/createTheme';
import { Mixins } from './createMixins';
import { Shadows } from './shadows';
import { Transitions } from './createTransitions';
import { Typography } from './createTypography';
import { ZIndex } from './zIndex';
import { Palette } from './palette';

export type ComponentsVariants = {
  [Name in keyof ComponentsPropsList]?: Array<{
    props: Partial<ComponentsPropsList[Name]>;
    style: Interpolation<{ theme: Theme }>;
  }>;
};

export interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}

export interface Theme extends BaseTheme {
  components?: Components<BaseTheme>;
}

export type ComponentsProps = {
  [Name in keyof ComponentsPropsList]?: Partial<ComponentsPropsList[Name]>;
};

export type ComponentsPropsList = {
  [name: string]: Record<string, unknown>;
};

export type Components<Theme = unknown> = {
  [Name in keyof ComponentsPropsList]?: {
    defaultProps?: ComponentsProps[Name];
    styleOverrides?: ComponentsOverrides<Theme>[Name];
    variants?: ComponentsVariants[Name];
  };
};

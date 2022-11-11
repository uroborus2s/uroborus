import { deepmerge } from '@mui/utils';
import extendTheme, {
  ColorSystemOptions,
  CssVarsThemeOptions,
} from './extendTheme';
import { RuntimeColorSystem, Theme } from './types';
import { createSoftInversion, createSolidInversion } from './variantUtils';

export const createThemeWithVars = (
  themeInput?: Omit<CssVarsThemeOptions, 'colorSchemes'> & ColorSystemOptions,
) => {
  const {
    colorSchemes,
    focus,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    radius,
    shadow,
    palette: paletteInput,
    ...restTheme
  } = extendTheme(themeInput);

  const colorSchemePalette = deepmerge(
    colorSchemes[paletteInput?.colorScheme || 'light'].palette,
    paletteInput,
  );

  const {
    mode = 'light',
    colorScheme = 'light',
    ...palette
  } = colorSchemePalette as RuntimeColorSystem['palette'];

  return {
    focus,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    radius,
    shadow,
    ...restTheme,
    colorSchemes: {
      ...colorSchemes,
      [colorScheme]: palette,
    },
    palette: {
      ...palette,
      mode,
      colorScheme,
    },
    vars: {
      radius,
      shadow,
      focus,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight,
      palette,
    },
    getColorSchemeSelector: () => '&',
  } as unknown as Theme;
};

const defaultTheme = createThemeWithVars();

defaultTheme.colorInversion = deepmerge(
  {
    soft: createSoftInversion(defaultTheme),
    solid: createSolidInversion(defaultTheme),
  },
  defaultTheme.colorInversion,
);

export default defaultTheme;

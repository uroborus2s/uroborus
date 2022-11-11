import createCssVarsProvider from '@mui/system/cssVars';
import { deepmerge } from '@mui/utils';
import type {
  DefaultColorScheme,
  ExtendedColorScheme,
} from './types/colorScheme';
import extendTheme from './extendTheme';
import { Theme } from './types';
import { createSoftInversion, createSolidInversion } from './variantUtils';

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(
    /^(typography|variants|breakpoints|colorInversion|colorInversionConfig)$/,
  ) ||
  (keys[0] === 'focus' && keys[1] !== 'thickness');

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } =
  createCssVarsProvider<DefaultColorScheme | ExtendedColorScheme>({
    theme: extendTheme(),
    attribute: 'data-uro-color-scheme',
    modeStorageKey: 'uro-mode',
    colorSchemeStorageKey: 'uro-color-scheme',
    defaultColorScheme: {
      light: 'light',
      dark: 'dark',
    },
    shouldSkipGeneratingVar,
    resolveTheme: (mergedTheme: Theme) => {
      // `colorInversion` need to be generated after the theme's palette has been calculated.
      mergedTheme.colorInversion = deepmerge(
        {
          soft: createSoftInversion(mergedTheme),
          solid: createSolidInversion(mergedTheme),
        },
        mergedTheme.colorInversion,
        { clone: false },
      );
      return mergedTheme;
    },
  });

export {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript,
  shouldSkipGeneratingVar,
};

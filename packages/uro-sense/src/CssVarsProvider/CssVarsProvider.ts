import createCssVarsProvider from '../styles/cssStyle/createCssVarsProvider.js';
import extendTheme from '../styles/extendTheme.js';
import type {
  DefaultColorScheme,
  ExtendedColorScheme,
} from '../styles/index.js';

const { CssGlobalProvider, useColorScheme, getInitColorSchemeScript } =
  createCssVarsProvider<DefaultColorScheme | ExtendedColorScheme>({
    theme: extendTheme(),
    attribute: 'data-uro-color-scheme',
    modeStorageKey: 'uro-mode',
    colorSchemeStorageKey: 'uro-color-scheme',
    defaultColorScheme: {
      light: 'light',
      dark: 'dark',
    },
  });

export { useColorScheme, getInitColorSchemeScript, CssGlobalProvider };

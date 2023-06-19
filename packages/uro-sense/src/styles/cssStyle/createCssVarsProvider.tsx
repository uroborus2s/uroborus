import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { ThemeProvider } from '@mui/system';
import { invariant } from '@uroborus/core';

import {
  ColorSystem,
  DefaultColorScheme,
  Palette,
  Theme,
} from '../types/index.js';

import systemGetInitColorSchemeScript, {
  DEFAULT_ATTRIBUTE,
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  GetInitColorSchemeScriptOptions,
} from './getInitColorSchemeScript.js';
import type { Mode } from './getInitColorSchemeScript.js';
import useCurrentColorScheme from './useCurrentColorScheme.js';
import type { Result } from './useCurrentColorScheme.js';

export interface ColorSchemeContextValue<SupportedColorScheme extends string>
  extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export interface CssProviderConfig<ColorScheme extends string> {
  /**
   * 应用配色方案的 DOM 属性
   * @default 'data-color-scheme'
   */
  attribute?: string;
  /**
   * 用于存储应用程序“mod”的 localStorage 键值
   * @default 'mode'
   */
  modeStorageKey?: string;
  /**
   * 用于存储应用程序“colorScheme”的 localStorage 键值
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string;
  /**
   * 设计系统默认配色方案。
   * - 如果设计系统有一种默认配色方案（(either light or dark)，则提供字符串
   * - 如果设计系统具有默认的light & dark配色方案，则提供对象
   */
  defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme };
  /**
   * 设计系统默认模式
   * @default 'light'
   */
  defaultMode?: Mode;
}

export interface CssProviderProps<ColorScheme extends string>
  extends Partial<CssProviderConfig<ColorScheme>> {
  theme?: Theme;
  /**
   * 用于附加配色方案属性的节点
   * @default document
   */
  colorSchemeNode?: Element | null;
  /**
   * 附加“存储”事件侦听器的窗口
   * @default window
   */
  storageWindow?: Window | null;
  /**
   * 如果为“true”，提供程序将创建自己的上下文并生成样式表，就好像它是根“CssVarsProvider”一样。
   */
  disableNestedContext?: boolean;
}

export interface CreateCssProviderOptions<ColorScheme extends string>
  extends CssProviderConfig<ColorScheme> {
  /**
   * 设计系统默认主题
   *
   */
  theme: Theme;
  /**
   * 附加 CSS 变量后调用的函数。此函数的结果将是传递给 ThemeProvider 的最终主题。
   * 我们需要首先将来自用户输入的变量和默认主题组合起来，然后从这些变量生成变体。
   */
  resolveTheme?: (theme: any) => any; // the type is any because it depends on the design system.
}

export interface CreateCssProviderResult<ColorScheme extends string> {
  CssGlobalProvider: FC<PropsWithChildren<CssProviderProps<ColorScheme>>>;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme>;
  getInitColorSchemeScript: typeof systemGetInitColorSchemeScript;
}

export const DISABLE_CSS_TRANSITION =
  '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';

const getDefaultColorScheme = <ColorScheme extends string>(
  colorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme },
) => {
  let defaultLightColorScheme: ColorScheme;
  if (typeof colorScheme === 'string') {
    defaultLightColorScheme = colorScheme;
  } else {
    defaultLightColorScheme = colorScheme.light;
  }
  let defaultDarkColorScheme: ColorScheme;
  if (typeof colorScheme === 'string') {
    defaultDarkColorScheme = colorScheme;
  } else {
    defaultDarkColorScheme = colorScheme.dark;
  }
  return { defaultLightColorScheme, defaultDarkColorScheme };
};

const createCssVarsProvider = <ColorScheme extends string>({
  theme: defaultTheme,
  attribute: defaultAttribute = DEFAULT_ATTRIBUTE,
  modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
  colorSchemeStorageKey:
    defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  defaultMode: designSystemMode = 'light',
  defaultColorScheme: designSystemColorScheme,
  resolveTheme,
}: CreateCssProviderOptions<ColorScheme>): CreateCssProviderResult<ColorScheme> => {
  if (
    !defaultTheme.colorSchemes ||
    (typeof designSystemColorScheme === 'string' &&
      !defaultTheme.colorSchemes[
        designSystemColorScheme as DefaultColorScheme
      ]) ||
    (typeof designSystemColorScheme === 'object' &&
      (!defaultTheme.colorSchemes[
        designSystemColorScheme.dark as DefaultColorScheme
      ] ||
        !defaultTheme.colorSchemes[
          designSystemColorScheme.light as DefaultColorScheme
        ]))
  ) {
    console.error(
      `Uro-sense: \`${designSystemColorScheme}\` does not exist in \`theme.colorSchemes\`.`,
    );
  }

  const ColorSchemeContext =
    createContext<ColorSchemeContextValue<ColorScheme> | null>(null);

  const useColorScheme = () => {
    const value = useContext(ColorSchemeContext);
    invariant(
      value,
      'Uro-sense: `useColorScheme` must be called under <CssVarsProvider />',
    );
    return value!;
  };

  const CssGlobalProvider: FC<
    PropsWithChildren<CssProviderProps<ColorScheme>>
  > = ({
    children,
    theme: themeProp = defaultTheme,
    modeStorageKey = defaultModeStorageKey,
    colorSchemeStorageKey = defaultColorSchemeStorageKey,
    attribute = defaultAttribute,
    defaultMode = designSystemMode,
    defaultColorScheme = designSystemColorScheme,
    storageWindow = typeof window === 'undefined' ? undefined : window,
    colorSchemeNode = typeof document === 'undefined'
      ? undefined
      : document.documentElement,
    disableNestedContext = false,
  }) => {
    const hasMounted = useRef(false);
    const ctx = useContext(ColorSchemeContext);
    const nested = !!ctx && !disableNestedContext;

    const { colorSchemes, ...restThemeProp } = themeProp;

    const allColorSchemes = Object.keys(colorSchemes) as ColorScheme[];
    const { defaultDarkColorScheme, defaultLightColorScheme } =
      getDefaultColorScheme(defaultColorScheme);

    // 1. Get the data about the `mode`, `colorScheme`, and setter functions.
    const {
      mode: stateMode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme: stateColorScheme,
      setColorScheme,
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageWindow,
    });
    let mode = stateMode;
    let colorScheme = stateColorScheme;

    if (nested) {
      const { mode: ctxMode, colorScheme: ctxColorScheme } = ctx;
      mode = ctxMode;
      colorScheme = ctxColorScheme;
    }
    const calculatedMode = (() => {
      if (!mode) {
        // This scope occurs on the server
        if (defaultMode === 'system') {
          return designSystemMode;
        }
        return defaultMode;
      }
      return mode;
    })();

    const calculatedColorScheme = (() => {
      if (!colorScheme) {
        // This scope occurs on the server
        if (calculatedMode === 'dark') {
          return defaultDarkColorScheme;
        }
        // use light color scheme, if default mode is 'light' | 'system'
        return defaultLightColorScheme;
      }
      return colorScheme;
    })();

    // 3. 开始编写主题对象
    const theme: Theme = {
      ...restThemeProp,
      colorSchemes,
      getColorSchemeSelector: (targetColorScheme: string) =>
        `[${attribute}="${targetColorScheme}"] &`,
    };

    Object.entries(colorSchemes).forEach(([key, scheme]) => {
      if (key === calculatedColorScheme) {
        // 4.1 Merge the selected color scheme to the theme
        Object.keys(scheme as ColorSystem).forEach((schemeKey) => {
          if (schemeKey === 'palette') {
            // shallow merge the 1st level structure of the theme.
            theme[schemeKey] = {
              ...theme[schemeKey],
              ...((scheme as ColorSystem)[
                schemeKey as keyof ColorSystem
              ] as Palette),
            };
          } else if (
            schemeKey === 'shadowRing' ||
            schemeKey === 'shadowChannel'
          ) {
            theme[schemeKey] = scheme[schemeKey];
          }
        });
        if (theme.palette) {
          theme.palette.colorScheme = key as DefaultColorScheme;
        }
      }
    });

    // 5. 宣布效果
    // 5.1 更新选择器值以使用当前配色方案，该方案将告诉CSS使用正确的样式表。
    useEffect(() => {
      if (colorScheme && colorSchemeNode) {
        // attaches attribute to <html> because the css variables are attached to :root (html)
        colorSchemeNode.setAttribute(attribute, colorScheme);
      }
    }, [colorScheme, attribute, colorSchemeNode]);

    useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);

    const contextValue = useMemo(
      () => ({
        mode,
        systemMode,
        setMode,
        lightColorScheme,
        darkColorScheme,
        colorScheme,
        setColorScheme,
        allColorSchemes,
      }),
      [
        allColorSchemes,
        colorScheme,
        darkColorScheme,
        lightColorScheme,
        mode,
        setColorScheme,
        setMode,
        systemMode,
      ],
    );

    return (
      <ColorSchemeContext.Provider value={contextValue}>
        <ThemeProvider theme={resolveTheme ? resolveTheme(theme) : theme}>
          {children}
        </ThemeProvider>
      </ColorSchemeContext.Provider>
    );
  };

  const { defaultDarkColorScheme, defaultLightColorScheme } =
    getDefaultColorScheme(designSystemColorScheme);

  const getInitColorSchemeScript = (params?: GetInitColorSchemeScriptOptions) =>
    systemGetInitColorSchemeScript({
      attribute: defaultAttribute,
      colorSchemeStorageKey: defaultColorSchemeStorageKey,
      defaultMode: designSystemMode,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey: defaultModeStorageKey,
      ...params,
    });

  return { useColorScheme, CssGlobalProvider, getInitColorSchemeScript };
};

export default createCssVarsProvider;

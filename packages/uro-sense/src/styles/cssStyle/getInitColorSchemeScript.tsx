export const DEFAULT_MODE_STORAGE_KEY = 'mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-color-scheme';

export type Mode = 'light' | 'dark' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;

export interface GetInitColorSchemeScriptOptions {
  /**
   * 首次访问使用的模式
   * @default 'light'
   */
  defaultMode?: Mode;
  /**
   * 'light' 模式下使用的默认配色方案
   * @default 'light'
   */
  defaultLightColorScheme?: string;
  /**
   * 'dark' 模式下使用的默认配色方案
   * * @default 'dark'
   */
  defaultDarkColorScheme?: string;
  /**
   * 用于附加配色方案属性的节点（以string形式提供）
   * @default 'document.documentElement'
   */
  colorSchemeNode?: string;
  /**
   * 用于存储 `mode` 的 localStorage key
   * @default 'mode'
   */
  modeStorageKey?: string;
  /**
   * 用于存储 `colorScheme` 的 localStorage key
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string;
  /**
   * 应用配色方案的 DOM 属性
   * @default 'data-color-scheme'
   */
  attribute?: string;
}

export default function getInitColorSchemeScript(
  options?: GetInitColorSchemeScriptOptions,
) {
  const {
    defaultMode = 'light',
    defaultLightColorScheme = 'light',
    defaultDarkColorScheme = 'dark',
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = 'document.documentElement',
  } = options || {};

  return (
    <script
      key="mui-color-scheme-init"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var mode = localStorage.getItem('${modeStorageKey}') || '${defaultMode}';
        var cssColorScheme = mode;
        var colorScheme = '';
        if (mode === 'system') {
          // handle system mode
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql.matches) {
            cssColorScheme = 'dark';
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
          } else {
            cssColorScheme = 'light';
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
          }
        }
        if (mode === 'light') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
        }
        if (mode === 'dark') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
        }
        if (colorScheme) {
          ${colorSchemeNode}.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`,
      }}
    />
  );
}

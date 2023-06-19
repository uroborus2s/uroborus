import { useCallback, useEffect, useRef, useState } from 'react';

import {
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_MODE_STORAGE_KEY,
} from './getInitColorSchemeScript.js';
import type { Mode, SystemMode } from './getInitColorSchemeScript.js';

export interface State<SupportedColorScheme extends string> {
  /**
   * 用户选择的模式。
   * 注意：在服务器上，mode 总是未定义的
   */
  mode: Mode | undefined;
  /**
   * 仅当 `mode: 'system'`时有效, 只能为 'light' | 'dark' 两者之一。
   */
  systemMode: SystemMode | undefined;
  /**
   * 'light' 模式的配色方案。
   */
  lightColorScheme: SupportedColorScheme;
  /**
   * 'dark' 模式的配色方案。
   */
  darkColorScheme: SupportedColorScheme;
}

export type Result<SupportedColorScheme extends string> =
  State<SupportedColorScheme> & {
    /**
     * 当前应用程序配色方案。它在服务器上始终为“未定义”。
     */
    colorScheme: SupportedColorScheme | undefined;
    /**
     * `mode` 保存到内部状态和本地存储
     * 如果 `mode` 为 null，它将被重置为 defaultMode
     */
    setMode: (mode: Mode | null) => void;
    /**
     * `colorScheme` 保存到内部状态和本地存储
     * 如果 `colorScheme` 为 null，它将被重置为 defaultColorScheme (light | dark)
     */
    setColorScheme: (
      colorScheme:
        | SupportedColorScheme
        | Partial<{
            light: SupportedColorScheme | null;
            dark: SupportedColorScheme | null;
          }>
        | null,
    ) => void;
  };

interface UseCurrentColoSchemeOptions<SupportedColorScheme extends string> {
  defaultLightColorScheme: SupportedColorScheme;
  defaultDarkColorScheme: SupportedColorScheme;
  supportedColorSchemes: Array<SupportedColorScheme>;
  defaultMode?: Mode;
  modeStorageKey?: string;
  colorSchemeStorageKey?: string;
  storageWindow?: Window | null;
}

function processState<T>(
  state: { mode: Mode | undefined; systemMode: SystemMode | undefined },
  callback: (mode: SystemMode) => T,
) {
  if (
    state.mode === 'light' ||
    (state.mode === 'system' && state.systemMode === 'light')
  ) {
    return callback('light');
  }
  if (
    state.mode === 'dark' ||
    (state.mode === 'system' && state.systemMode === 'dark')
  ) {
    return callback('dark');
  }
  return undefined;
}

export function getColorScheme<SupportedColorScheme extends string>(
  state: State<SupportedColorScheme>,
) {
  return processState(state, (mode) => {
    if (mode === 'light') {
      return state.lightColorScheme;
    }
    if (mode === 'dark') {
      return state.darkColorScheme;
    }
    return undefined;
  });
}

export function getSystemMode(
  mode: undefined | string,
): SystemMode | undefined {
  if (typeof window !== 'undefined' && mode === 'system') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      return 'dark';
    }
    return 'light';
  }
  return undefined;
}

function initializeValue(key: string, defaultValue: string) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let value;
  try {
    value = localStorage.getItem(key) || undefined;
    if (!value) {
      // the first time that user enters the site.
      localStorage.setItem(key, defaultValue);
    }
  } catch (e) {
    // Unsupported
  }
  return value || defaultValue;
}

export default <SupportedColorScheme extends string>({
  defaultMode = 'light',
  defaultLightColorScheme,
  defaultDarkColorScheme,
  supportedColorSchemes = [],
  modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
  colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  storageWindow = typeof window === 'undefined' ? undefined : window,
}: UseCurrentColoSchemeOptions<SupportedColorScheme>): Result<SupportedColorScheme> => {
  const joinedColorSchemes = supportedColorSchemes.join(',');

  const [state, setState] = useState(() => {
    const initialMode = initializeValue(modeStorageKey, defaultMode);
    const lightColorScheme = initializeValue(
      `${colorSchemeStorageKey}-light`,
      defaultLightColorScheme,
    );
    const darkColorScheme = initializeValue(
      `${colorSchemeStorageKey}-dark`,
      defaultDarkColorScheme,
    );
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme,
    } as State<SupportedColorScheme>;
  });

  const colorScheme = getColorScheme(state);

  const setMode: Result<SupportedColorScheme>['setMode'] = useCallback(
    (mode) =>
      setState((currentState) => {
        if (mode === currentState.mode) {
          // do nothing if mode does not change
          return currentState;
        }
        const newMode = !mode ? defaultMode : mode;
        try {
          localStorage.setItem(modeStorageKey, newMode);
        } catch (e) {
          // Unsupported
        }
        return {
          ...currentState,
          mode: newMode,
          systemMode: getSystemMode(newMode),
        };
      }),
    [modeStorageKey, defaultMode],
  );

  const setColorScheme: Result<SupportedColorScheme>['setColorScheme'] =
    useCallback(
      (value) => {
        if (!value) {
          setState((currentState) => {
            try {
              localStorage.setItem(
                `${colorSchemeStorageKey}-light`,
                defaultLightColorScheme,
              );
              localStorage.setItem(
                `${colorSchemeStorageKey}-dark`,
                defaultDarkColorScheme,
              );
            } catch (e) {
              // Unsupported
            }
            return {
              ...currentState,
              lightColorScheme: defaultLightColorScheme,
              darkColorScheme: defaultDarkColorScheme,
            };
          });
        } else if (typeof value === 'string') {
          if (value && !joinedColorSchemes.includes(value)) {
            console.error(
              `\`${value}\` does not exist in \`theme.colorSchemes\`.`,
            );
          } else {
            setState((currentState) => {
              const newState = { ...currentState };
              processState(currentState, (mode) => {
                try {
                  localStorage.setItem(
                    `${colorSchemeStorageKey}-${mode}`,
                    value,
                  );
                } catch (e) {
                  // Unsupported
                }
                if (mode === 'light') {
                  newState.lightColorScheme = value;
                }
                if (mode === 'dark') {
                  newState.darkColorScheme = value;
                }
              });
              return newState;
            });
          }
        } else {
          setState((currentState) => {
            const newState = { ...currentState };
            const newLightColorScheme =
              value.light === null ? defaultLightColorScheme : value.light;
            const newDarkColorScheme =
              value.dark === null ? defaultDarkColorScheme : value.dark;

            if (newLightColorScheme) {
              if (!joinedColorSchemes.includes(newLightColorScheme)) {
                console.error(
                  `\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`,
                );
              } else {
                newState.lightColorScheme = newLightColorScheme;
                try {
                  localStorage.setItem(
                    `${colorSchemeStorageKey}-light`,
                    newLightColorScheme,
                  );
                } catch (error) {
                  // Unsupported
                }
              }
            }

            if (newDarkColorScheme) {
              if (!joinedColorSchemes.includes(newDarkColorScheme)) {
                console.error(
                  `\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`,
                );
              } else {
                newState.darkColorScheme = newDarkColorScheme;
                try {
                  localStorage.setItem(
                    `${colorSchemeStorageKey}-dark`,
                    newDarkColorScheme,
                  );
                } catch (error) {
                  // Unsupported
                }
              }
            }

            return newState;
          });
        }
      },
      [
        joinedColorSchemes,
        colorSchemeStorageKey,
        defaultLightColorScheme,
        defaultDarkColorScheme,
      ],
    );

  const handleMediaQuery = useCallback(
    (e?: MediaQueryListEvent) => {
      if (state.mode === 'system') {
        setState((currentState) => ({
          ...currentState,
          systemMode: e?.matches ? 'dark' : 'light',
        }));
      }
    },
    [state.mode],
  );

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  useEffect(() => {
    const handler = (...args: any) => mediaListener.current(...args);

    // Always listen to System preference
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Intentionally use deprecated listener methods to support iOS & old browsers
    try {
      // Chrome & Firefox
      media.addEventListener('change', handler);
    } catch (e) {
      try {
        // Safari
        media.addListener(handler);
      } catch (e2) {
        console.error(e2);
      }
    }
    handler(media);

    return () => {
      try {
        media.removeEventListener('change', handler);
      } catch (e) {
        try {
          media.removeListener(handler);
        } catch (e1) {
          console.error(e1);
        }
      }
    };
  }, []);

  // Handle when localStorage has changed
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      const value = event.newValue;
      if (
        event.key &&
        event.key.startsWith(colorSchemeStorageKey) &&
        (!value || joinedColorSchemes.match(value))
      ) {
        // If the key is deleted, value will be null then reset color scheme to the default one.
        if (event.key.endsWith('light')) {
          setColorScheme({ light: value as SupportedColorScheme | null });
        }
        if (event.key.endsWith('dark')) {
          setColorScheme({ dark: value as SupportedColorScheme | null });
        }
      }
      if (
        event.key === modeStorageKey &&
        (!value || ['light', 'dark', 'system'].includes(value))
      ) {
        setMode((value as Mode) || defaultMode);
      }
    };
    if (storageWindow) {
      // For syncing color-scheme changes between iframes
      storageWindow.addEventListener('storage', handleStorage);
      return () => storageWindow.removeEventListener('storage', handleStorage);
    }
    return undefined;
  }, [
    setColorScheme,
    setMode,
    modeStorageKey,
    colorSchemeStorageKey,
    joinedColorSchemes,
    defaultMode,
    storageWindow,
  ]);

  return {
    ...state,
    colorScheme,
    setMode,
    setColorScheme,
  };
};

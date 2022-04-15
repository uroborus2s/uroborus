import { deepmerge } from '@mui/utils';
import {
  createTheme as systemCreateTheme,
  ThemeOptions as SystemThemeOptions,
} from '@mui/system';

import createMixins, { MixinsOptions } from './createMixins';
import createPalette from './createPalette';
import createTypography, { TypographyOptions } from './createTypography';
import shadows, { Shadows } from './shadows';
import createTransitions, { TransitionsOptions } from './createTransitions';
import zIndex, { ZIndexOptions } from './zIndex';
import { BaseTheme, Components, Theme } from './components';
import { ComponentNameToClassKey, ComponentsOverrides } from './overrides';
import { Palette, PaletteOptions } from './palette';
import { generateUtilityClass } from '@mui/base';

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'> {
  mixins?: MixinsOptions;
  components?: Components<BaseTheme>;
  palette?: PaletteOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  zIndex?: ZIndexOptions;
  unstable_strictMode?: boolean;
}

function createTheme(options: ThemeOptions = {}, ...args: any[]): Theme {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const systemTheme = systemCreateTheme(options);

  let uiTheme: Theme = deepmerge(systemTheme, {
    mixins: createMixins(
      systemTheme.breakpoints,
      systemTheme.spacing,
      mixinsInput,
    ),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: { ...zIndex },
  }) as Theme;

  uiTheme = deepmerge(uiTheme, other);
  uiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), uiTheme);

  if (process.env.NODE_ENV !== 'production') {
    const stateClasses = [
      'active',
      'checked',
      'completed',
      'disabled',
      'error',
      'expanded',
      'focused',
      'focusVisible',
      'required',
      'selected',
    ];

    const traverse = (
      node: ComponentsOverrides,
      component: keyof ComponentNameToClassKey,
    ) => {
      let key;

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (key in node) {
        // @ts-ignore
        const child = node[key];
        if (
          stateClasses.indexOf(key) !== -1 &&
          child &&
          Object.keys(child).length > 0
        ) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = generateUtilityClass('', key);
            console.error(
              [
                `MUI: The \`${component}\` component increases ` +
                  `the CSS specificity of the \`${key}\` internal state.`,
                'You can not override it like this: ',
                JSON.stringify(node, null, 2),
                '',
                `Instead, you need to use the '&.${stateClass}' syntax:`,
                JSON.stringify(
                  {
                    root: {
                      [`&.${stateClass}`]: child,
                    },
                  },
                  null,
                  2,
                ),
                '',
                'https://mui.com/r/state-classes-guide',
              ].join('\n'),
            );
          }
          // Remove the style to prevent global conflicts.
          // @ts-ignore
          node[key] = {};
        }
      }
    };
    if (uiTheme.components) {
      Object.entries(uiTheme.components).forEach(([k, v]) => {
        if (v && k.startsWith('Tud')) {
          // @ts-ignore
          traverse(v.styleOverrides, k);
        }
      });
    }
  }

  return uiTheme;
}

let warnedOnce = false;

export function createUITheme(options: ThemeOptions = {}, ...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(
        [
          'Uroborus-UI: the createMuiTheme function was renamed to createTheme.',
          '',
          "You should use `import { createTheme } from '@uroborus/styled'`",
        ].join('\n'),
      );
    }
  }

  return createTheme(options, ...args);
}

export default createTheme;

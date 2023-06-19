import type { CSSObject } from '@mui/system';

import type {
  DefaultColorPalette,
  PaletteRange,
  PaletteVariant,
  VariantKey,
} from './types/index.js';

export const isVariantPalette = (
  colorPalette: string | number | Record<string, any>,
) =>
  colorPalette &&
  typeof colorPalette === 'object' &&
  Object.keys(colorPalette).some((value) =>
    value.match?.(
      /^(plain(Hover|Active|Disabled)?(Color|Bg)|outlined(Hover|Active|Disabled)?(Color|Border|Bg)|soft(Hover|Active|Disabled)?(Color|Bg)|solid(Hover|Active|Disabled)?(Color|Bg))$/,
    ),
  );

const assignCss = (
  options: Record<string, string>,
  variantVar: string,
  value: string,
) => {
  if (variantVar.includes('Color')) {
    options.color = value;
  }
  if (variantVar.includes('Bg')) {
    options.backgroundColor = value;
  }
  if (variantVar.includes('Border')) {
    options.borderColor = value;
  }
};

/**
 *
 * @param name variant name
 * @example 'plain'
 *
 * @param palette object that contains palette tokens
 * @example { primary: { plainColor: '', plainHoverColor: '', ...tokens }, ...other palete }
 *
 * @param getCssVar a function that receive variant token and return a CSS variable
 *
 * result will be the stylesheet based on the palette tokens
 * @example {
 *   color: '--token',
 *   backgroundColor: '--token',
 *   '--variant-borderWidth': '0px',
 * }
 * @example {
 *   cursor: 'pointer',
 *   color: '--token',
 *   backgroundColor: '--token',
 *   '--variant-borderWidth': '1px',
 * }
 * @example {
 *   pointerEvents: 'none',
 *   cursor: 'default',
 *   color: '--token',
 *   backgroundColor: '--token',
 *   '--variant-borderWidth': '0px',
 * }
 */
export const createVariantStyle = (
  name: string,
  palette: Partial<PaletteRange> | undefined,
  getCssVar?: (variantVar: keyof PaletteVariant) => string,
) => {
  const result: CSSObject = {};
  (
    Object.entries(palette || {}) as Array<[keyof PaletteVariant, string]>
  ).forEach(([variantVar, value]) => {
    if (
      variantVar.match(new RegExp(`${name}(color|bg|border)`, 'i')) &&
      !!value
    ) {
      const cssVar = getCssVar ? getCssVar(variantVar) : value;
      if (variantVar.includes('Hover')) {
        result.cursor = 'pointer';
      }
      if (variantVar.includes('Disabled')) {
        result.pointerEvents = 'none';
        result.cursor = 'default';
      }
      if (variantVar.match(/(Hover|Active|Disabled)/)) {
        assignCss(result as any, variantVar, cssVar);
      } else {
        // initial state
        if (!result['--variant-borderWidth']) {
          result['--variant-borderWidth'] = '0px';
        }
        if (variantVar.includes('Border')) {
          result['--variant-borderWidth'] = '1px';
          result.border = 'var(--variant-borderWidth) solid';
        }
        // border color should come later
        assignCss(result as any, variantVar, cssVar);
      }
    }
  });
  return result;
};

interface ThemeFragment {
  cssVarPrefix?: string;
  getCssVar: (...args: any[]) => string;
  palette: Record<string, any>;
}

const createPrefixVar = (cssVarPrefix: string | undefined | null) => {
  return (cssVar: string) =>
    `--${cssVarPrefix ? `${cssVarPrefix}-` : ''}${cssVar.replace(/^--/, '')}`;
};

export const createVariant = (variant: VariantKey, theme?: ThemeFragment) => {
  let result = {} as Record<DefaultColorPalette | 'context', CSSObject>;
  if (theme) {
    const { getCssVar, palette } = theme;
    Object.entries(palette).forEach((entry) => {
      const [color, colorPalette] = entry as [
        Exclude<DefaultColorPalette, 'context'>,
        string | number | Record<string, any>,
      ];
      if (isVariantPalette(colorPalette) && typeof colorPalette === 'object') {
        result = {
          ...result,
          [color]: createVariantStyle(variant, colorPalette, (variantVar) =>
            getCssVar(`palette-${color}-${variantVar}`),
          ),
        };
      }
    });
  }
  return result;
};

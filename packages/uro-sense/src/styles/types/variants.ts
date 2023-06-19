import type { CSSObject } from '@mui/system';
import type { OverridableStringUnion } from '@uroborus/core';

import type { ColorPaletteProp } from './colorSystem.js';
import { DefaultColorPalette } from './colorSystem.js';
import { Theme } from './theme.js';

export interface VariantPropOverrides {}

export type DefaultVariantProp = 'plain' | 'outlined' | 'soft' | 'solid';

export type VariantProp = OverridableStringUnion<
  DefaultVariantProp,
  VariantPropOverrides
>;

type State = 'Hover' | 'Active' | 'Disabled';

type StateLower = 'normal' | 'hover' | 'active' | 'disabled';

export type VariantKey = DefaultVariantProp | `${DefaultVariantProp}${State}`;

export type DefaultVariantKey =
  | Exclude<DefaultVariantProp, 'solid'>
  | `${Exclude<DefaultVariantProp, 'solid'>}${State}`;

// Split interfaces into multiple chunks so that they can be augmented independently
export interface Variants extends Record<ColorPaletteProp, VariantPalette> {}
export interface VariantRange extends Record<StateLower, CSSObject> {
  variantBorderWidth: number;
}

export interface VariantPlain extends VariantRange {}
export interface VariantOutlined extends VariantRange {}
export interface VariantSoft extends VariantRange {}
export interface VariantSolid extends VariantRange {}

export interface VariantPalette {
  plain: VariantPlain;
  outlined: VariantOutlined;
  soft: VariantSoft;
  solid: VariantSolid;
}

export interface VariantPlainInversion
  extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantOutlinedInversion
  extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSoftInversion
  extends Record<ColorPaletteProp, CSSObject> {}
export interface VariantSolidInversion
  extends Record<ColorPaletteProp, CSSObject> {}

export interface VariantOverrides {
  plain?: VariantPlainInversion;
  outlined?: VariantOutlinedInversion;
  soft: VariantSoftInversion;
  solid: VariantSolidInversion;
}

export interface ColorInversionConfig
  extends Partial<Record<VariantProp, Array<VariantProp> | undefined>> {}

export const createVariants = (theme: Theme) => {
  let variants = {} as unknown as Variants;

  const createVariantStyle = (
    name: DefaultVariantProp,
    paletteKey: DefaultColorPalette,
  ) => {
    let variantStyles = {
      variantBorderWidth: 0,
    };
    (['normal', 'hover', 'active', 'disabled'] as Array<StateLower>).forEach(
      (action) => {
        const color = theme.palette[paletteKey][`${name}Color`];
        const backgroundColor = theme.palette[paletteKey][`${name}Bg`];
        const borderColor = theme.palette[paletteKey][`${name}Border`];

        const style: CSSObject = {
          ...(color ? { color } : {}),
          ...(backgroundColor ? { backgroundColor } : {}),
          ...(borderColor ? { borderColor } : {}),
        };
        if (action === 'hover') {
          style.cursor = 'pointer';
        } else if (action === 'disabled') {
          style.cursor = 'default';
          style.pointerEvents = 'none';
        } else if (action === 'normal') {
          if (borderColor) {
            variantStyles.variantBorderWidth = 1;
            style.border = `${variantStyles.variantBorderWidth}px solid`;
          }
        }

        variantStyles = {
          ...variantStyles,
          [action]: style,
        };
      },
    );
    return variantStyles;
  };

  const createVariant = (paletteName: DefaultColorPalette) => {
    let variant = {};
    (['plain', 'outlined', 'soft', 'solid'] as DefaultVariantProp[]).forEach(
      (variantName) => {
        variant = {
          ...variant,
          [variantName]: createVariantStyle(variantName, paletteName),
        };
      },
    );
    return variant as unknown as VariantPalette;
  };

  (
    [
      'primary',
      'neutral',
      'danger',
      'info',
      'success',
      'warning',
    ] as Array<DefaultColorPalette>
  ).forEach((palette) => {
    variants = {
      ...variants,
      [palette]: createVariant(palette),
    };
  });

  return variants;
};

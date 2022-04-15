import { PaletteColor, Theme } from '@uroborus/styled';
import { OverridableStringUnion } from '@mui/types';

const PaletteColorKeys = [
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
] as const;

type PaletteColorTypes = typeof PaletteColorKeys[number];

type PaletteActionColorTypes = 'action' | 'disabled' | 'inherit';

export type ColorProdKey = PaletteColorTypes | PaletteActionColorTypes;

export type ColorProdType<U extends {} = {}> = OverridableStringUnion<
  ColorProdKey,
  U
>;

export function tranThemeColor(
  theme: Theme,
  color: ColorProdType,
): string | undefined {
  return (
    (theme?.palette?.[color as PaletteColorTypes] as PaletteColor)?.main ??
    {
      action: theme.palette?.action?.active,
      disabled: theme.palette?.action?.disabled,
      inherit: 'inherit',
    }[color as PaletteActionColorTypes]
  );
}

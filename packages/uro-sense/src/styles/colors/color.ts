export type Color = Record<
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'A100'
  | 'A200'
  | 'A400'
  | 'A700',
  string
>;

export type ColorKey = keyof Color;

export function isColorKey(x: string | number): x is ColorKey {
  return [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    'A100',
    'A200',
    'A400',
    'A700',
    50,
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
  ].includes(x);
}

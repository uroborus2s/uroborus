export interface Radius {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export type RadiusProp = keyof Radius;

export const radius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
};

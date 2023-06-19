import { Theme } from './theme.js';

export interface Shadow {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export type ShadowProp = keyof Shadow;

export const createShadow = (theme: Theme) => ({
  xs: `${theme.shadowRing}, 0 1px 2px 0 rgba(${theme.shadowChannel} / 0.12)`,
  sm: `${theme.shadowRing}, 0.3px 0.8px 1.1px rgba(${theme.shadowChannel} / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(${theme.shadowChannel} / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(${theme.shadowChannel} / 0.26)`,
  md: `${theme.shadowRing}, 0.3px 0.8px 1.1px rgba(${theme.shadowChannel} / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(${theme.shadowChannel} / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(${theme.shadowChannel} / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(${theme.shadowChannel} / 0.29)`,
  lg: `${theme.shadowRing}, 0.3px 0.8px 1.1px rgba(${theme.shadowChannel} / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(${theme.shadowChannel} / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(${theme.shadowChannel} / 0.16), 4.8px 12px 17px -0.5px rgba(${theme.shadowChannel} / 0.19), 7px 17.5px 24.7px -0.7px rgba(${theme.shadowChannel} / 0.21)`,
  xl: `${theme.shadowRing}, 0.3px 0.8px 1.1px rgba(${theme.shadowChannel} / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(${theme.shadowChannel} / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(${theme.shadowChannel} / 0.16), 4.8px 12px 17px -0.5px rgba(${theme.shadowChannel} / 0.19), 7px 17.5px 24.7px -0.7px rgba(${theme.shadowChannel} / 0.21), 10.2px 25.5px 36px -0.9px rgba(${theme.shadowChannel} / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(${theme.shadowChannel} / 0.27), 21px 52.3px 74px -1.2px rgba(${theme.shadowChannel} / 0.29)`,
});

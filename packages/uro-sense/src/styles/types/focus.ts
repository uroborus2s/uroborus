import type { CSSObject } from '@mui/system';

import { generateUtilityClass } from '../className.js';

import type { Theme } from './theme.js';

export interface Focus {
  thickness: string;
  selector: string;
  default: CSSObject;
}

export const createFocus = (theme: Theme) => ({
  thickness: '2px',
  selector: `&.${generateUtilityClass('', 'focusVisible')}, &:focus-visible`,
  get default() {
    return {
      outlineOffset: `var(--focus-outline-offset, ${this.thickness})`,
      outline: `${this.thickness} solid ${theme.palette.focusVisible}`,
    };
  },
});

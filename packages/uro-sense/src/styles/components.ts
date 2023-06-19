import type { CSSInterpolation } from '@mui/system';
import type { GlobalStateSlot } from '@uroborus/core';

import type {
  CircularProgressOwnerState,
  CircularProgressProps,
  CircularProgressSlot,
} from '../CircularProgress/index.js';

export type OverridesStyleRules<
  ClassKey extends string = string,
  ComponentOwnerState = Record<string, unknown>,
  Theme = unknown,
> = Partial<
  Record<
    Exclude<ClassKey, GlobalStateSlot>,
    | CSSInterpolation
    | ((
        // Record<string, unknown> is for other props that the slot receive internally
        // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
        props: {
          ownerState: ComponentOwnerState & Record<string, unknown>;
          theme: Theme;
        } & Record<string, unknown>,
      ) => CSSInterpolation)
  >
>;

export interface Components<Theme = unknown> {
  UroCircularProgress?: {
    defaultProps?: Partial<CircularProgressProps>;
    styleOverrides?: OverridesStyleRules<
      CircularProgressSlot,
      CircularProgressOwnerState,
      Theme
    >;
  };
}

import { CSSObject, CSSInterpolation } from '@mui/system';
import { ComponentsPropsList } from './components';

export type OverridesStyleRules<
  ClassKey extends string = string,
  ComponentName = keyof ComponentNameToClassKey,
  Theme = unknown,
> = Record<
  ClassKey,
  | CSSInterpolation
  | ((
      // Record<string, unknown> is for other props that the component receive internally
      // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
      props: (ComponentName extends keyof ComponentNameToClassKey
        ? {
            ownerState: ComponentsPropsList[ComponentName] &
              Record<string, unknown>;
          }
        : Record<any, any>) & { theme: Theme } & Record<string, unknown>,
    ) => CSSInterpolation)
>;

export type ComponentsOverrides<Theme = unknown> = {
  [Name in keyof ComponentsPropsList]?: Partial<
    OverridesStyleRules<ComponentNameToClassKey[Name], Name, Theme>
  >;
} & {
  MuiCssBaseline?: CSSObject | string;
};

export type ComponentNameToClassKey<ClassKey extends string = string> = {
  [Name in keyof ComponentsPropsList]: ClassKey;
};

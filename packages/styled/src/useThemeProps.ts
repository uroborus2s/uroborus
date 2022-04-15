import { useThemeProps as systemUseThemeProps } from '@mui/system';
import defaultTheme from './defaultTheme';
import { Components, Theme } from './components';

export interface ThemeWithProps {
  components?: Components<Omit<Theme, 'components'>>;
}

export default function useThemeProps<
  Theme extends ThemeWithProps,
  Props,
  Name extends keyof any,
>({ props, name }: { props: Props; name: Name }) {
  return systemUseThemeProps({ props, name, defaultTheme });
}

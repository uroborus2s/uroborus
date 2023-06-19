import { useThemeProps as systemUseThemeProps } from '@mui/system';

export default function useThemeProps<T>({
  props,
  name,
}: {
  props: T;
  name: string;
}) {
  return systemUseThemeProps({
    props,
    name,
  });
}

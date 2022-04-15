import { useDebugValue } from 'react';
import { useTheme as useThemeSystem } from '@mui/system';
import defaultTheme from './defaultTheme';

export default function useTheme() {
  const theme = useThemeSystem(defaultTheme);

  if (process.env.NODE_ENV !== 'production') {
    useDebugValue(theme);
  }

  return theme;
}

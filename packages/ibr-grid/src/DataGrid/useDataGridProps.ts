import { GridProps } from './props';
import { useThemeProps } from '@uroborus/styled';
import { useMemo } from 'react';
import { GridLocaleText } from '../types/localTextApi';
import {
  GridIconSlotsComponent,
  GridSlotsComponent,
} from '../types/component/slots';
import Checkbox from '../components/Checkbox';

export const DEFAULT_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: 'No rows',
  noResultsOverlayLabel: 'No results found.',
  errorOverlayDefaultLabel: 'An error occurred.',
};

export const DEFAULT_ICON_SLOTS_COMPONENTS: GridIconSlotsComponent = {
  BooleanCellTrueIcon:
};

export const DEFAULT_SLOTS_COMPONENTS: GridSlotsComponent = {
  BaseCheckbox: Checkbox,
};

export const useDataGridProps = (inProps: GridProps) => {
  const themedProps = useThemeProps({ props: inProps, name: 'UrobGrid' });

  const localeText = useMemo(
    () => ({ ...DEFAULT_LOCALE_TEXT, ...themedProps.localeText }),
    [themedProps.localeText],
  );

  const components = useMemo(() => {
    const overrides = themedProps.components;

    if (!overrides) {
      return { ...DEFAULT_SLOTS_COMPONENTS };
    }
  }, [themedProps.components]);
};

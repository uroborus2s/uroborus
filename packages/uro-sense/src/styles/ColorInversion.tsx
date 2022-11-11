import * as React from 'react';
import { useTheme as useSystemTheme } from '@mui/system';
import defaultTheme from './defaultTheme';
import { ColorPaletteProp, VariantProp } from './types';

const VariantOverride = React.createContext<undefined | Array<VariantProp>>(
  undefined,
);

export const useColorInversion = (childVariant: VariantProp | undefined) => {
  const overriableVariants = React.useContext(VariantOverride);
  return {
    getColor: (
      instanceColorProp: ColorPaletteProp | 'inherit' | undefined,
      defaultColorProp: ColorPaletteProp | 'inherit' | undefined,
    ): ColorPaletteProp | 'inherit' | undefined => {
      if (overriableVariants && childVariant) {
        if (overriableVariants.includes(childVariant)) {
          return instanceColorProp || 'context';
        }
      }
      return instanceColorProp || defaultColorProp;
    },
  };
};

export interface ColorInversionProviderProps {
  children: React.ReactNode;
  variant?: VariantProp;
}

export const ColorInversionProvider = ({
  children,
  variant,
}: ColorInversionProviderProps) => {
  const theme = useSystemTheme(defaultTheme);
  return (
    <VariantOverride.Provider
      value={variant ? theme.colorInversionConfig[variant] : undefined}
    >
      {children}
    </VariantOverride.Provider>
  );
};

export default VariantOverride;

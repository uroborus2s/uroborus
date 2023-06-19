import { ReactElement } from 'react';

import type { Interpolation } from '@emotion/react';
import { Global } from '@emotion/react';

export interface GlobalStylesProps<Theme = {}> {
  defaultTheme?: Theme;
  styles: Interpolation<Theme>;
}

function isEmpty(obj: any) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0;
}

const GlobalStyles = ({
  styles,
  defaultTheme = {},
}: GlobalStylesProps): ReactElement => {
  const globalStyles =
    typeof styles === 'function'
      ? (themeInput: any) =>
          styles(isEmpty(themeInput) ? defaultTheme : themeInput)
      : styles;

  return <Global styles={globalStyles} />;
};

export default GlobalStyles;

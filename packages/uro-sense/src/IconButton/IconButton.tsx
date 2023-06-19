import { forwardRef } from 'react';

import { useThemeProps } from '../styles/index.js';

import { componentName } from './IconButtonClasses.js';
import type { IconButtonProps } from './IconButtonProps.js';

const IconButton = forwardRef<HTMLElement, IconButtonProps>((inProps, ref) => {
  const props = useThemeProps({
    props: inProps,
    name: componentName,
  });
});

IconButton.displayName = 'Uro-IconButton';

export default IconButton;

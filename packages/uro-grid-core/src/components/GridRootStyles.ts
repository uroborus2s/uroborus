import type { CSSInterpolation } from '@uroborus/core';
import styled from 'sense-ui/styles';

import { gridComponentName } from '../hooks/useUtilityClasses.js';

import { DataGridOwnerState } from './gridProps.js';

export const GridRootStyle = styled('div', {
  name: gridComponentName,
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DataGridOwnerState }>(({ theme, ownerState }) => {
  const { userSelect, cursor } = ownerState;
  const gridStyle: CSSInterpolation = {
    position: 'relative', // set to relative, so absolute popups appear relative to this
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    userSelect: userSelect ? 'none' : 'inherit',
    WebkitUserSelect: userSelect ? 'none' : 'inherit',
    cursor: cursor ? 'ew-resize' : 'default',
  };
  return gridStyle;
});

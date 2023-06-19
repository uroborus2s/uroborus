import styled from 'sense-ui/styles';

import { gridComponentName } from '../hooks/useUtilityClasses.js';

export const GridBodyStyle = styled('div', {
  name: gridComponentName,
  slot: 'Body',
  overridesResolver: (props, styles) => styles.body,
})(({ theme }) => ({
  cursor: 'default',
  position: 'relative', // set to relative, so absolute popups appear relative to this
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

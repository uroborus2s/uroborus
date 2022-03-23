import { FC } from 'react';
import { styled } from '@mui/material/styles';

const GridMainContainerStyeld = styled('div', {
  name: 'MuiDataGrid',
  slot: 'Main',
  overridesResolver: (props, styles) => styles.main,
})(() => ({
  position: 'relative',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const GridMainContainer: FC = () => {};

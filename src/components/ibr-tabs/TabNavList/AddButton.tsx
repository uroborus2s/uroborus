import { AddProps } from '@ibr/ibr-tabs';
import styled from '@mui/material/styles/styled';
import React, { ForwardRefRenderFunction } from 'react';

const AddRoot = styled('div')({});

const AddButton: ForwardRefRenderFunction<HTMLDivElement, AddProps> = (
  {},
  ref,
) => {
  return <AddRoot />;
};
export default React.forwardRef(AddButton);

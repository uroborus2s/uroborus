import { OperationProps } from '@ibr/ibr-tabs';
import styled from '@mui/material/styles/styled';
import React, { ForwardRefRenderFunction } from 'react';

const OperationNodeRoot = styled('div')({});

const OperationButton: ForwardRefRenderFunction<
  HTMLDivElement,
  OperationProps
> = ({}, ref) => {
  return <OperationNodeRoot />;
};
export default React.forwardRef(OperationButton);

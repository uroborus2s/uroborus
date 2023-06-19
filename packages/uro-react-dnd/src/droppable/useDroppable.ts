import { useRef } from 'react';

import { invariant } from '@uroborus/core';
import { useRequiredContext } from '@uroborus/hooks';
import { useRecoilStoreID } from 'recoil';

import { AppContext } from '../context/AppContext.js';

import type { DroppableProps } from './interface/DroppableProps.js';
import useDropValidation from './useDropValidation.js';

export default (props: DroppableProps) => {
  const appContext = useRequiredContext(AppContext);

  invariant(appContext, 'Could not find app context');

  const droppableRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLElement>(null);

  useDropValidation({ props, droppableRef, placeholderRef });

  const { droppableId, type, mode, direction } = props;

  const contextId = useRecoilStoreID();

  return { innerRef };
};

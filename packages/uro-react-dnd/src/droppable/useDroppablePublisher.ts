import { useRef } from 'react';

import {
  useLayoutEffect,
  useRequiredContext,
  useUniqueId,
} from '@uroborus/hooks';

import { AppContext } from '../context/AppContext.js';
import type { DndAppContext } from '../core/DndAppContext.js';

import type {
  PublisherProps,
  WhileDragging,
} from './interface/DroppableProps.js';

export default (props: PublisherProps) => {
  const whileDraggingRef = useRef<WhileDragging>(null);

  const appContext = useRequiredContext(AppContext) as DndAppContext;
  const uniqueId = useUniqueId({ prefix: 'droppable' });

  const entryRef = useRef({
    uniqueId,
    descriptor: { id: props.droppableId, type: props.type, mode: props.mode },
  });
  useLayoutEffect(() => {
    appContext.droppable.register(entryRef);

    return () => {
      appContext.droppable.unregister(entryRef);
    };
  }, [entryRef]);
};

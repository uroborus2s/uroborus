import { useCallback } from 'react';

import { getBodyElement } from '@uroborus/core';
import { useRecoilValue } from 'recoil';

import { globalAppState } from '../context/GlobalState.js';
import { whatIsDraggedOver } from '../core/draggedServices.js';
import type { DraggableDimension, DroppableId } from '../core/index.js';

import type { DroppableProps } from './interface/DroppableProps.js';

export default ({
  type = 'DEFAULT',
  mode = 'standard',
  direction = 'vertical',
  isDropDisabled = false,
  isCombineEnabled = false,
  ignoreContainerClipping = false,
  droppableId: id,
  getContainerForClone = getBodyElement,
  renderClone,
}: DroppableProps) => {
  const state = useRecoilValue(globalAppState);

  const idleWithAnimation = {
    placeholder: null,
    shouldAnimatePlaceholder: true,
    snapshot: {
      isDraggingOver: false,
      draggingOverWith: null,
      draggingFromThisWith: null,
      isUsingPlaceholder: false,
    },
    useClone: null,
    type,
    mode,
    direction,
    isDropDisabled,
    isCombineEnabled,
    ignoreContainerClipping,
    droppableId: id,
    getContainerForClone,
  };

  const getProps = useCallback(
    (
      isDraggingOverForConsumer: boolean,
      isDraggingOverForImpact: boolean,
      dragging: DraggableDimension,
    ) => {
      const draggableId = dragging.descriptor.id;
      const isHome = dragging.descriptor.droppableId === id;
      if (isHome) {
        const useClone = renderClone ? {} : null;
        const snapshot = {
          isDraggingOver: isDraggingOverForConsumer,
          draggingOverWith: isDraggingOverForConsumer ? draggableId : null,
          draggingFromThisWith: draggableId,
          isUsingPlaceholder: true,
        };

        return {
          ...idleWithAnimation,
          placeholder: dragging.placeholder,
          shouldAnimatePlaceholder: false,
          snapshot,
          useClone,
        };
      }

      if (isDropDisabled) {
        return { ...idleWithAnimation, shouldAnimatePlaceholder: false };
      }
      // not over foreign list - return idle
      if (!isDraggingOverForImpact) {
        return idleWithAnimation;
      }

      const snapshot = {
        isDraggingOver: isDraggingOverForConsumer,
        draggingOverWith: draggableId,
        draggingFromThisWith: null,
        isUsingPlaceholder: true,
      };

      return {
        ...idleWithAnimation,
        placeholder: dragging.placeholder,
        // Animating placeholder in foreign list
        shouldAnimatePlaceholder: true,
        snapshot,
        useClone: null,
      };
    },
    [],
  );

  if ('isDragging' in state && state.isDragging) {
    const { critical, dimensions } = state;
    if (type !== critical.droppable.type) {
      return { ...idleWithAnimation, shouldAnimatePlaceholder: false };
    }
    const dragging = dimensions.draggables[critical.draggable.id];
    const isDraggingOver = whatIsDraggedOver(state.impact);

    return getProps(isDraggingOver, isDraggingOver, dragging);
  }

  return idleWithAnimation;
};

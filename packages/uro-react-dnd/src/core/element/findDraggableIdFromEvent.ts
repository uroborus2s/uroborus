import { closest, isHtmlElement, Logurs } from '@uroborus/core';

import attribute from '../attributes.js';
import type { ContextId } from '../interface/GlobalType.js';

function getSelector(contextId: ContextId): string {
  return `[${attribute.dragHandle.contextId}="${contextId}"]`;
}

const findClosestDragHandleFromEvent = (
  contextId: ContextId,
  event: Event,
  logger: Logurs,
) => {
  const { target } = event;
  if (!isHtmlElement(target)) {
    logger.warn('event.target must be a Element');
    return null;
  }
  const selector = getSelector(contextId);
  const handle = closest(target as Element, selector);

  if (!handle) {
    return null;
  }
  return handle;
};

export default (contextId: ContextId, event: Event, logger: Logurs) => {
  const handle = findClosestDragHandleFromEvent(contextId, event, logger);
  if (!handle) {
    return null;
  }
  return handle.getAttribute(attribute.dragHandle.draggableId);
};

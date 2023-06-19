import { find, isHtmlElement, Log2web } from '@uroborus/core';

import attributes from '../attributes.js';
import type { ContextId } from '../interface/GlobalType.js';
import type { DraggableId } from '../interface/IDraggable.js';

export default (
  contextId: ContextId,
  draggableId: DraggableId,
  logger: Log2web,
) => {
  // cannot create a selector with the draggable id as it might not be a valid attribute selector
  const selector = `[${attributes.draggable.contextId}="${contextId}"]`;
  const possible = Array.of(...document.querySelectorAll(selector)).slice();

  const draggable = find(
    possible,
    (el: Element) => el.getAttribute(attributes.draggable.id) === draggableId,
  );

  if (!draggable) {
    return null;
  }

  if (!isHtmlElement(draggable)) {
    logger.warn('Draggable element is not a HTMLElement');
    return null;
  }

  return draggable;
};

import { isHtmlElement } from '@uroborus/core';

export const interactiveTagNames = {
  input: true,
  button: true,
  textarea: true,
  select: true,
  option: true,
  optgroup: true,
  video: true,
  audio: true,
} as Record<string, boolean>;

const isAnInteractiveElement = (
  parent: Element,
  current: Element | null,
): boolean => {
  if (!current) {
    return false;
  }

  // Most interactive elements cannot have children. However, some can such as 'button'.
  // See 'Permitted content' on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
  // Rather than having two different functions we can consolidate our checks into this single
  // function to keep things simple.
  // There is no harm checking if the parent has an interactive tag name even if it cannot have
  // any children. We need to perform this loop anyway to check for the contenteditable attribute
  const hasAnInteractiveTag = Boolean(
    interactiveTagNames[current.tagName.toLowerCase()],
  );

  if (hasAnInteractiveTag) {
    return true;
  }

  const attribute = current.getAttribute('contenteditable');
  if (attribute === 'true' || attribute === '') {
    return true;
  }

  // nothing more can be done and no results found
  if (current === parent) {
    return false;
  }

  // recursion to check parent
  return isAnInteractiveElement(parent, current.parentElement);
};

export const isEventInInteractiveElement = (
  draggable: Element,
  event: Event,
) => {
  const { target } = event;

  if (!isHtmlElement(target)) {
    return false;
  }

  return isAnInteractiveElement(draggable, target as Element);
};

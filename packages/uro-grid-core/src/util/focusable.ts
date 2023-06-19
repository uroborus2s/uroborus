import { FOCUSABLE_EXCLUDE, FOCUSABLE_SELECTOR } from '@uroborus/core';

import { GridOptionsService } from '../service/gridOptionsService.js';

const findFocusableElements = (
  rootNode: HTMLElement,
  exclude?: string | null,
  onlyUnmanaged = false,
): HTMLElement[] => {
  const focusableString = FOCUSABLE_SELECTOR;
  let excludeString = FOCUSABLE_EXCLUDE;

  if (exclude) {
    excludeString += `, ${exclude}`;
  }

  if (onlyUnmanaged) {
    excludeString += ', [tabindex="-1"]';
  }

  const nodes = Array.prototype.slice.apply(
    rootNode.querySelectorAll(focusableString),
  ) as HTMLElement[];
  const excludeNodes = Array.prototype.slice.apply(
    rootNode.querySelectorAll(excludeString),
  ) as HTMLElement[];

  if (!excludeNodes.length) {
    return nodes;
  }

  const diff = (a: HTMLElement[], b: HTMLElement[]) =>
    a.filter((element) => b.indexOf(element) === -1);
  return diff(nodes, excludeNodes);
};

export const findNextFocusableElement = (
  gridOptionsService: GridOptionsService,
  rootElem?: HTMLElement,
  onlyManaged?: boolean | null,
  backwards?: boolean,
) => {
  const rootNode = rootElem || gridOptionsService.rootElementRef.current!;
  const focusable = findFocusableElements(
    rootNode,
    onlyManaged ? ':not([tabindex="-1"])' : null,
  );
  const eDocument = gridOptionsService.getDocument();
  const activeEl = eDocument.activeElement as HTMLElement;
  let currentIndex: number;

  if (onlyManaged) {
    currentIndex = focusable.findIndex((el) => el.contains(activeEl));
  } else {
    currentIndex = focusable.indexOf(activeEl);
  }

  const nextIndex = currentIndex + (backwards ? -1 : 1);

  if (nextIndex < 0 || nextIndex >= focusable.length) {
    return null;
  }

  return focusable[nextIndex];
};

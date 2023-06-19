import {
  FOCUSABLE_EXCLUDE,
  FOCUSABLE_SELECTOR,
  getTabIndex,
  last,
} from '@uroborus/core';

import { GridOptionsService } from '../service/gridOptionsService.js';

const clearFocusedCell = (resetSelf: () => void) => () => {
  resetSelf();
};

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

const focusInto = (
  rootNode: HTMLElement,
  up = false,
  onlyUnmanaged = false,
) => {
  const focusableElements = findFocusableElements(
    rootNode,
    null,
    onlyUnmanaged,
  );
  const toFocus = up ? last(focusableElements) : focusableElements[0];

  if (toFocus) {
    toFocus.focus();
    return true;
  }

  return false;
};

const getFocusableContainers = (rootElement: HTMLElement) => {
  const els: HTMLElement[] = [];

  const gridBodyCompEl = rootElement.querySelector('.uro-root');
  const sideBarEl = rootElement.querySelector('.uro-side-bar');
  if (gridBodyCompEl) {
    els.push(gridBodyCompEl as HTMLElement);
  }

  if (sideBarEl) {
    els.push(sideBarEl as HTMLElement);
  }

  return els;
};

const findTabbableParent = (
  nodeProps: HTMLElement | null,
  limit = 5,
): HTMLElement | null => {
  let counter = 0;
  let node = nodeProps;
  while (node && getTabIndex(node) === null && counter < limit) {
    node = node.parentElement;
    counter += 1;
  }

  if (getTabIndex(node) === null) {
    return null;
  }

  return node;
};

const isDetailGrid = (rootElement: HTMLElement): boolean => {
  const el = findTabbableParent(rootElement);

  return el?.getAttribute('row-id')?.startsWith('detail') || false;
};

export default (gridConfiguration: GridOptionsService) => {
  const focusNextInnerContainer = (backwards: boolean) => {
    const eDocument = gridConfiguration.getDocument();

    const focusableContainers = getFocusableContainers(
      gridConfiguration.rootElementRef.current!,
    );
    const idxWithFocus = focusableContainers.findIndex((container) =>
      container.contains(eDocument.activeElement),
    );
    const nextIdx = idxWithFocus + (backwards ? -1 : 1);

    if (nextIdx <= 0 || nextIdx >= focusableContainers.length) {
      return false;
    }

    return focusInto(focusableContainers[nextIdx]);
  };

  const focusNextGridCoreContainer = (backwards: boolean) => {
    if (focusNextInnerContainer(backwards)) {
      return true;
    }

    if (
      !backwards &&
      !isDetailGrid(gridConfiguration.rootElementRef.current!)
    ) {
    }

    return false;
  };

  const onColumnEverythingChanged = () => {};

  const onCellFocused = () => {};

  return { focusNextGridCoreContainer };
};

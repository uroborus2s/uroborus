import { useRecoilValue } from 'recoil';
import { gridOptionsWrapperAtom } from '@/state';
import { MutableRefObject, useCallback } from 'react';
import { Constants } from '@/constants';

const findFocusableElements = (
  rootNode: HTMLElement | undefined,
  exclude?: string | null,
  onlyUnmanaged = false,
) => {
  if (!rootNode) return null;

  const focusableString = Constants.FOCUSABLE_SELECTOR;
  let excludeString = Constants.FOCUSABLE_EXCLUDE;

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

export default function () {
  const gridWrapOptions = useRecoilValue(gridOptionsWrapperAtom);

  const findNextFocusableElement = useCallback(
    (
      rootNode?: MutableRefObject<HTMLElement | undefined>,
      onlyManaged?: boolean,
      backwards?: boolean,
    ) => {
      const rootRef = gridWrapOptions?.getGridRootRef();

      const rootEmel = rootNode
        ? rootNode.current ?? rootRef?.current
        : rootRef?.current;
      const focusable = findFocusableElements(
        rootEmel,
        onlyManaged ? ':not([tabindex="-1"])' : null,
      );
      if (focusable) {
        const eDocument = gridWrapOptions!.getDocument();
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
      }
      return null;
    },
    [gridWrapOptions],
  );

  return { findNextFocusableElement };
}

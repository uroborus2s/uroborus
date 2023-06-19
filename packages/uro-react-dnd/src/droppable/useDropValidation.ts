import { type MutableRefObject } from 'react';

import {
  runChecks,
  invariant,
  isBoolean,
  isHtmlElement,
  Logurs,
} from '@uroborus/core';
import { useDevelopment } from '@uroborus/hooks';

import type { DroppableProps } from './interface/DroppableProps.js';

interface Args {
  props: DroppableProps;
  droppableRef: MutableRefObject<HTMLElement | null>;
  placeholderRef: MutableRefObject<HTMLElement | null>;
}

export default (args: Args) => {
  const logger = new Logurs({ name: '' });
  useDevelopment(() => {
    runChecks(args, [
      ({ props }: Args) => {
        invariant(props.droppableId, 'A Droppable requires a droppableId prop');
        invariant(
          typeof props.droppableId === 'string',
          `A Droppable requires a [string] droppableId. Provided: [${typeof props.droppableId}]`,
        );
      },
      ({ props }: Args) => {
        invariant(
          isBoolean(props.isDropDisabled),
          'isDropDisabled must be a boolean',
        );
        invariant(
          isBoolean(props.isCombineEnabled),
          'isCombineEnabled must be a boolean',
        );
        invariant(
          isBoolean(props.ignoreContainerClipping),
          'ignoreContainerClipping must be a boolean',
        );
      },
      ({ droppableRef }: Args) => {
        invariant(
          droppableRef.current && isHtmlElement(droppableRef.current),
          'innerRef has not been provided with a HTMLElement.',
        );
      },
    ]);
  });

  if (args.props.mode === 'standard') {
    runChecks(args, [
      ({ placeholderRef }: Args) => {
        if (!(placeholderRef && placeholderRef.current)) {
          logger.warn(`
          Droppable setup issue [droppableId: "${args.props.droppableId}"]:
          DroppableProvided > placeholder could not be found.

          Please be sure to add the {provided.placeholder} React Node as a child of your Droppable.`);
        }
      },
    ]);
  }

  if (args.props.mode === 'virtual') {
    invariant(
      args.props.renderClone,
      'Must provide a clone render function (renderClone) for virtual lists',
    );
    invariant(
      !args.placeholderRef.current,
      'Expected virtual list to not have a placeholder',
    );
  }
};

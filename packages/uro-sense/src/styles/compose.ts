import { deepmerge } from '@uroborus/core';

import type { Theme } from './types/theme.js';

export interface StyleFunction<PropKey extends string> {
  (props: Partial<Record<PropKey, any>>): any;
  filterProps: string[];
}

type Props = { [K in string]?: unknown } & { theme?: Theme };

export function compose<T extends Array<StyleFunction<any>>>(...styles: T) {
  const handlers = styles.reduce((acc, style) => {
    style.filterProps.forEach((prop) => {
      acc[prop] = style;
    });

    return acc;
  }, {} as Record<string, StyleFunction<any>>);

  const fn = (props: Props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return deepmerge(acc, handlers[prop](props));
      }

      return acc;
    }, {});
  };

  (fn as StyleFunction<any>).filterProps = styles.reduce(
    (acc, style) => acc.concat(style.filterProps),
    [] as string[],
  );

  return fn;
}

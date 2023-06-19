import { useMemo } from 'react';

import { NumberSequence } from '@uroborus/core';

export interface Sequence {
  next: () => number;
}

const count = new NumberSequence();

export interface UniqueIdOptions {
  prefix?: string;
  separator?: string;
  counter?: Sequence;
}

export default (options: UniqueIdOptions = {}) => {
  const { prefix = '', separator = '-', counter = count } = options;
  return useMemo(
    () => `${prefix}${options.separator}${counter.next()}`,
    [prefix, separator, counter],
  );
};

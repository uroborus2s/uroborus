import React, { LegacyRef, useMemo } from 'react';
import setRef from './setRef';

export default function useForkRef<T>(...refs: React.Ref<T>[]): LegacyRef<T> {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */

  return useMemo(() => {
    const newRefs = refs.filter((ref) => ref != null && ref != undefined);
    return (refValue: T) => {
      newRefs.forEach((ref) => {
        // @ts-ignore
        setRef(ref, refValue);
      });
    };
  }, [...refs]);
}

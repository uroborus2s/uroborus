import { useEffect, useState } from 'react';
import { isIdType } from '@/util';

export default function useDependentState<D>(
  dependency: D,
): [D, (data: D) => void] {
  const [state, setState] = useState<D>(dependency);

  useEffect(() => {
    if (!equalOfOrder(dependency, state)) setState(dependency);
  }, [dependency]);

  return [state, setState];
}

function equalOfOrder<D>(original: D, additional: D): boolean {
  if (!Array.isArray(original) || !Array.isArray(additional)) return true;
  else if (original.length !== additional.length) return false;
  else {
    for (const i in original) {
      if (isIdType(original[i]) && isIdType(additional[i])) {
        if (original[i].id !== additional[i].id) return false;
      }
    }
    return true;
  }
}

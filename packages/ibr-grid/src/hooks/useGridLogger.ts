import { Logger } from '@uroborus/core';
import { MutableRefObject, useRef } from 'react';
import { logurs2 } from '@uroborus/core';

export function useGridLogger<Api extends GridApiCommon>(
  apiRef: MutableRefObject<Api>,
  name: string,
): Logger {
  const logger = useRef<Logger | null>(null);

  if (logger.current === null) {
    logger.current = logurs2.getLogger(name);
  }

  return logger.current!;
}

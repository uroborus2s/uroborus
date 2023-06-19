import { custom, nullable, or } from '@recoiljs/refine';
import type { EventFunction, EventType } from '@uroborus/core';
import { atom, RecoilValue } from 'recoil';
import { syncEffect } from 'recoil-sync';

import { GridOptionsService } from '../service/gridOptionsService.js';

export const gridConfigurationGlobal = atom<
  GridOptionsService | null | undefined
>({
  key: '@uroborus/grid/configuration',
  default: null,
  effects: [
    syncEffect({
      itemKey: 'gridOptions',
      refine: nullable(
        custom((option) =>
          option instanceof GridOptionsService ? option : null,
        ),
      ),
    }),
  ],
});

export const listenerEffect = <P extends EventType>(
  getPromise: <S>(recoilValue: RecoilValue<S>) => Promise<S>,
  key: string,
  listener:
    | ((
        configService: GridOptionsService | null | undefined,
      ) => EventFunction<P>)
    | EventFunction<P>,
) => {
  const eventLister = typeof listener === 'function' ? listener() : listener();
  getPromise(gridConfigurationGlobal).then((configService) => {
    configService?.addEventListener(key, eventLister);
  });

  return () => {
    getPromise(gridConfigurationGlobal).then((configService) => {
      configService?.removeEventListener(key, eventLister);
    });
  };
};

export const dispatchEffect = <T extends EventType>(
  getPromise: <S>(recoilValue: RecoilValue<S>) => Promise<S>,
  event: T,
) => {
  getPromise(gridConfigurationGlobal).then((configService) => {
    configService?.dispatchEvent(event);
  });
};

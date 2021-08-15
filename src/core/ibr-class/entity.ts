import { Repository } from '@ibr-class/repository';
import { AtomEffect, DefaultValue } from 'recoil';
import { eventBus, initByReadWorkspaceList } from '@/core/event-hub';

export const localStorageAtomEffect = <T>(
  id: string,
  storage: Repository,
  field: string,
): AtomEffect<T> => ({ setSelf, resetSelf }) => {
  setSelf(
    storage
      .readone(id)
      .then((base) => (base ? base.property(field) : new DefaultValue())),
  );

  eventBus.on(initByReadWorkspaceList);

  return () => {
    resetSelf();
  };
};

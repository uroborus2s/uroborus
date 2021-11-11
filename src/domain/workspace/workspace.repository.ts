import {
  atom,
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selector,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import {
  CommandOptions,
  CREATWORKSPACE,
  EDITWORKSPACE,
  READWORKSPACELIST,
  WorkspaceEntity,
  WorkspacesData,
} from '../index';
import { pureDispatcher } from '../core';

export const workspaces = (function () {
  class WorkspaceEntity {
    readonly planId: (workspaceId: string) => RecoilState<string>;
    readonly isEdit: (workspaceId: string) => RecoilState<boolean>;
    readonly baseIds: (workspaceId: string) => RecoilState<Set<string>>;
    readonly name: (workspaceId: string) => RecoilState<string>;
    readonly ids: RecoilState<Set<string>>;
    readonly workspaces: RecoilValueReadOnly<WorkspacesData[]>;
    readonly baseIdsAll: RecoilValueReadOnly<string[]>;
    readonly basesNumber: (workspaceId: string) => RecoilValueReadOnly<number>;
    readonly getWorkspaceIdByBaseId: (
      baseId: string,
    ) => RecoilValueReadOnly<string | undefined>;

    constructor() {
      this.planId = atomFamily({
        key: 'workspace/planId',
        default: '',
      });

      this.isEdit = atomFamily<boolean, string>({
        key: 'workspace/editstate',
        default: false,
      });

      this.baseIds = atomFamily({
        key: 'workspace/baseIds',
        default: new Set(),
      });

      this.name = atomFamily({
        key: 'workspace/name',
        default: '',
      });

      this.ids = atom({
        key: 'workspace/ids',
        default: new Set(),
      });

      this.workspaces = selector({
        key: 'workspace/workspaces',
        get: ({ get }) => {
          const ids = get(this.ids);
          return [...ids].map((id) => ({
            id: id,
            name: get(this.name(id)),
            baseNumber: get(this.baseIds(id)).size,
          }));
        },
      });

      this.basesNumber = selectorFamily({
        key: 'workspace/basesNumber',
        get:
          (id: string) =>
          ({ get }) =>
            get(this.baseIds(id)).size,
      });

      this.getWorkspaceIdByBaseId = selectorFamily({
        key: 'workspace/getWorkspaceIdByBaseId',
        get:
          (baseId: string) =>
          ({ get }) => {
            const ids = get(this.ids);
            return [...ids].find(
              (wId) =>
                [...get(this.baseIds(wId))].findIndex(
                  (bId) => baseId == bId,
                ) !== -1,
            );
          },
      });

      this.baseIdsAll = selector({
        key: 'workspace/allbaseids',
        get: ({ get }) => {
          const ids = get(this.ids);
          const all: string[] = [];
          ids.forEach((id) => all.push(...get(this.baseIds(id))));
          return all;
        },
      });
    }
  }

  return new WorkspaceEntity();
})();

function saveByAll(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  if (options.response && options.response.workspaces && options.response.ids) {
    const entitys = options.response.workspaces as WorkspaceEntity[];
    const ids = options.response.ids as string[];
    entitys.forEach((entity) => {
      const { id, name, plan_id, baseIds } = entity;
      set(workspaces.name(id), name);
      set(workspaces.planId(id), plan_id);
      set(workspaces.isEdit(id), false);
      set(workspaces.baseIds(id), new Set(baseIds));
    });
    set(workspaces.ids, new Set(ids));
  }
}

function savaByNewWorksapce(
  { set, get }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  if (options.response && options.response.workspace) {
    const { id, name, plan_id, baseIds } = options.response
      .workspace as WorkspaceEntity;
    set(workspaces.planId(id), plan_id);
    set(workspaces.isEdit(id), true);
    set(workspaces.baseIds(id), new Set(baseIds));
    set(workspaces.name(id), name);
    const ids = get(workspaces.ids);
    set(workspaces.ids, new Set([...ids.add(id)]));
  }
}

function edit({ set }: TransactionInterface_UNSTABLE, options: CommandOptions) {
  if (options.response) {
    const { name, plan_id, id } = options.response;
    if (plan_id) set(workspaces.planId(id), plan_id);
    if (name) set(workspaces.name(id), name);
  }
}

export default pureDispatcher({
  [READWORKSPACELIST]: saveByAll,
  [CREATWORKSPACE]: savaByNewWorksapce,
  [EDITWORKSPACE]: edit,
});

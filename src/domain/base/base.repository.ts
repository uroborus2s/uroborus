import { BaseIconType, ColorType } from '@/core/util';
import {
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import { pureDispatcher } from '../core';
import {
  BaseEntity,
  CommandOptions,
  CREATWORKSPACE,
  EDITBASE,
  READWORKSPACELIST,
} from '../index';

export const base = (function () {
  class c {
    readonly name: (param: string) => RecoilState<string>;
    readonly color: (param: string) => RecoilState<ColorType>;
    readonly icon: (param: string) => RecoilState<BaseIconType>;
    readonly desc: (param: string) => RecoilState<string>;
    readonly lastUsedTableId: (param: string) => RecoilState<string>;
    readonly tableIds: (param: string) => RecoilState<string[]>;
    readonly bases: (
      param: string[],
    ) => RecoilValueReadOnly<{ name: string; id: string }[]>;

    constructor() {
      this.name = atomFamily<string, string>({
        key: 'base/name',
        default: '',
      });

      this.color = atomFamily<ColorType, string>({
        key: 'base/color',
        default: 'blue',
      });

      this.icon = atomFamily<BaseIconType, string>({
        key: 'base/icon',
        default: 'null',
      });

      this.desc = atomFamily<string, string>({
        key: 'base/desc',
        default: '',
      });

      this.lastUsedTableId = atomFamily<string, string>({
        key: 'base/lastUsedTableId',
        default: '',
      });

      this.tableIds = atomFamily<string[], string>({
        key: 'base/tableids',
        default: [],
      });

      this.bases = selectorFamily({
        key: 'base/bases',
        get:
          (ids: string[]) =>
          ({ get }) =>
            ids.map((id) => ({
              id: id,
              name: get(this.name(id)),
            })),
      });
    }
  }

  return new c();
})();

function init({ set }: TransactionInterface_UNSTABLE, options: CommandOptions) {
  if (options.response && options.response.bases) {
    const entitys = options.response.bases as BaseEntity[];
    entitys.forEach((entity) => {
      const { id, name, color, icon, selected_table_id, tableIds, desc } =
        entity;
      set(base.name(id), name);
      set(base.color(id), color);
      set(base.icon(id), icon);
      if (desc) set(base.desc(id), desc);
      if (selected_table_id) set(base.lastUsedTableId(id), selected_table_id);
      set(base.tableIds(id), tableIds ?? []);
    });
  }
}

function edit({ set }: TransactionInterface_UNSTABLE, options: CommandOptions) {
  if (options.response) {
    const { color, name, icon, id, desc } = options.response;
    if (color) set(base.color(id), color);
    if (name) set(base.name(id), name);
    if (icon) set(base.icon(id), icon);
    if (desc) set(base.desc(id), desc);
  }
}

export default pureDispatcher({
  [READWORKSPACELIST]: init,
  [CREATWORKSPACE]: init,
  [EDITBASE]: edit,
});
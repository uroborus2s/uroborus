import {
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import { pureDispatcher, validator } from '../core';
import { CREATVIEW, READTABLE } from '../domain.command';
import { CommandOptions, ViewData, ViewRsp, ViewSchemaType } from '../types';

export const view = (function () {
  class c {
    readonly name: (param: string) => RecoilState<string>;
    readonly desc: (param: string) => RecoilState<string>;
    readonly type: (param: string) => RecoilState<ViewSchemaType>;
    readonly views: (param: string[]) => RecoilValueReadOnly<ViewData[]>;

    constructor() {
      this.name = atomFamily<string, string>({
        key: 'view/name',
        default: '',
      });

      this.desc = atomFamily<string, string>({
        key: 'view/desc',
        default: '',
      });

      this.type = atomFamily<ViewSchemaType, string>({
        key: 'view/type',
        default: 'grid',
      });

      this.views = selectorFamily({
        key: 'view/views',
        get:
          (ids: string[]) =>
          ({ get }) =>
            ids.map((id) => ({
              id: id,
              name: get(this.name(id)),
              type: get(this.type(id)),
            })),
      });
    }
  }

  return new c();
})();

function writeViews(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const views = options.response.views || options.response.data;

  if (views) {
    if (validator(views)) {
      views.forEach((v: ViewRsp) => {
        const { id, name, desc, type } = v;
        if (id) {
          if (name) set(view.name(id), name);
          if (desc) set(view.desc(id), desc);
          if (type) set(view.type(id), type);
        }
      });
    }
  }
}

export default pureDispatcher({
  [READTABLE]: writeViews,
  [CREATVIEW]: writeViews,
});

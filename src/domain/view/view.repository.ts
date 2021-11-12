import { atomFamily, RecoilState, TransactionInterface_UNSTABLE } from 'recoil';
import { pureDispatcher, validator } from '../core';
import { READTABLE } from '../domain.command';
import { CommandOptions, ViewRsp, ViewSchemaType } from '../types';

export const view = (function () {
  class c {
    readonly name: (param: string) => RecoilState<string>;
    readonly desc: (param: string) => RecoilState<string>;
    readonly type: (param: string) => RecoilState<ViewSchemaType>;

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
    }
  }

  return new c();
})();

function writeViews(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  console.log(options.response);
  if (options.response && options.response.views) {
    const views = options.response.views;
    if (validator(views)) {
      views.forEach((v: ViewRsp) => {
        const { id, name, desc } = v;
        if (id) {
          if (name) set(view.name(id), name);
          if (desc) set(view.desc(id), desc);
        }
      });
    }
  }
}

export default pureDispatcher({
  [READTABLE]: writeViews,
});

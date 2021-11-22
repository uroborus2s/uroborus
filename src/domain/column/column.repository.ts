import {
  ColumnTypeKey,
  conversionToColTypeName,
} from '@/core/util/column-types';
import { READTABLE } from '../domain.command';
import { pureDispatcher } from '../core';
import { ColumnRsp, CommandOptions, OptionsType } from '../types';
import { atomFamily, RecoilState, TransactionInterface_UNSTABLE } from 'recoil';

export const column = (function () {
  class c {
    readonly name: (param: string) => RecoilState<string>;
    readonly desc: (param: string) => RecoilState<string>;
    readonly type: (param: string) => RecoilState<ColumnTypeKey>;
    readonly color: (param: string) => RecoilState<string>;
    readonly primary: (param: string) => RecoilState<boolean>;
    readonly options: (param: string) => RecoilState<OptionsType>;

    constructor() {
      this.name = atomFamily<string, string>({
        key: 'column/name',
        default: '',
      });

      this.desc = atomFamily<string, string>({
        key: 'column/desc',
        default: '',
      });

      this.type = atomFamily<ColumnTypeKey, string>({
        key: 'column/type',
        default: 'text',
      });

      this.color = atomFamily<string, string>({
        key: 'column/color',
        default: '',
      });

      this.primary = atomFamily<boolean, string>({
        key: 'column/primary',
        default: false,
      });

      this.options = atomFamily<OptionsType, string>({
        key: 'column/options',
        default: undefined,
      });
    }
  }

  return new c();
})();

function wirteColumns(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const { columns } = options.response;

  if (columns && Array.isArray(columns)) {
    columns.forEach((col: ColumnRsp) => {
      const { id, name, desc, options, color, type, primary } = col;
      if (name) set(column.name(id), name);
      if (color) set(column.color(id), color);
      if (desc) set(column.desc(id), desc);
      if (options) set(column.options(id), options);
      if (type) set(column.type(id), conversionToColTypeName(type));
      if (primary) set(column.primary(id), primary);
    });
  }
}

export default pureDispatcher({
  [READTABLE]: wirteColumns,
});

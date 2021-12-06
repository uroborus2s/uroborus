export const columnTypeText = {
  text: 'single-text',
  multilineText: 'multi-text',
  attachment: 'attachment',
  checkbox: 'checkbox',
  select: 'single-select',
  multiSelect: 'multi-select',
  collaborator: 'collaborator',
  date: 'datetime',
  phone: 'phone',
  number: 'number',
  timeDuration: 'timeDuration',
  rating: 'rating',
  formula: 'formula',
  computation: 'computation',
  autoNumber: 'autoNumber',
  foreignKey: 'foreignKey',
} as const;

//text:单行文本/email/地址
//multilineText:多行文本
//checkbox:复选框
//select:单选
//multiSelect:多选
//collaborator:协作成员
//date:时间
//phone:电话号码
//number:数字/百分比/货币
//rating:评分
//formula:函数
//computation:成员
//autoNumber:自增序列
//foreignKey:外键链接
export type ColumnTypeKey = keyof typeof columnTypeText;

export type ColumnIconKey =
  | 'text'
  | 'multilineText'
  | 'attachment'
  | 'checkbox'
  | 'select'
  | 'multiSelect'
  // | 'collaborator'
  | 'date'
  | 'phone'
  | 'email'
  | 'url'
  | 'decimal'
  | 'currency'
  | 'percent'
  | 'duration'
  | 'rating'
  | 'formula'
  | 'createdTime'
  | 'lastModifiedTime'
  // | 'createdBy'
  // | 'lastModifiedBy'
  // | 'autoNumber'
  | 'foreignKey';

export function conversionToColTypeName(value: string): ColumnTypeKey {
  const v1 = Object.entries(columnTypeText).find(([, v]) => v === value);
  if (v1) return v1[0] as ColumnTypeKey;
  else throw new Error(`列类型不正确!value=${value}`);
}

export function conversionColTypeToIconType(
  value: ColumnTypeKey,
  typeOptions: undefined | Record<string, unknown>,
): ColumnIconKey {
    
}

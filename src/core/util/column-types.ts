const columnTypeText = {
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
  rating: 'rating',
  formula: 'formula',
  computation: 'computation',
  autoNumber: 'autoNumber',
  foreignKey: 'foreignKey',
};

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
  | 'collaborator'
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
  | 'createdBy'
  | 'lastModifiedBy'
  | 'autoNumber'
  | 'foreignKey';

export function conversionToColTypeName(value: string): ColumnTypeKey {
  const v1 = Object.entries(columnTypeText).find(([, v]) => v === value);
  if (v1) return v1[0] as ColumnTypeKey;
  else throw new Error(`列类型不正确!value=${value}`);
}

export function conversionColTypeToIconType(
  value: ColumnTypeKey,
  typeOptions: undefined | Record<string, any>,
): ColumnIconKey {
  if (value == 'number') {
    switch (typeOptions?.format) {
      case 'decimal':
      case 'currency':
      case 'percent':
      case 'duration':
        return typeOptions.format;
      default:
        throw new Error(`number属性的${typeOptions?.format}类型不正确！`);
    }
  } else if (value == 'text') {
    if (typeOptions == undefined) return value;
    else {
      switch (typeOptions.validatorName) {
        case 'email':
        case 'url':
          return typeOptions.validatorName;
        default:
          throw new Error(`text属性的${typeOptions.validatorName}类型不正确！`);
      }
    }
  } else if (value == 'formula') {
    switch (typeOptions?.displayType) {
      case 'createdTime':
      case 'lastModifiedTime':
        return typeOptions.displayType;
      case undefined:
        return value;
      default:
        throw new Error(`formula属性的${typeOptions?.displayType}类型不正确！`);
    }
  } else if (value == 'computation') {
    switch (typeOptions?.computation) {
      case 'createdBy':
      case 'lastModifiedBy':
        return typeOptions.computation;
      default:
        throw new Error(
          `computation属性的${typeOptions?.computation}类型不正确！`,
        );
    }
  } else return value;
}

export const maxScreen = 74;
export const middleScreen = 52;
export const minScreen = 40;

export type DataType = 'workspace' | 'base';

export type ResultDataType = OriginDataType & {
  type: DataType;
  [key: string]: any;
};

export type OriginDataType = {
  id: string;
  name: string;
};

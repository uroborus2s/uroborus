export const IconColorTypeArr = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'cyan',
  'purple',
  'teal',
  'pink',
  'gray',
  'redLight',
  'orangeLight',
  'yellowLight',
  'greenLight',
  'blueLight',
  'cyanLight',
  'purpleLight',
  'tealLight',
  'pinkLight',
  'grayLight',
] as const;

export type ColorType = typeof IconColorTypeArr[number];

export const iconColors: Record<ColorType, string> = {
  red: '#f82b60', //红色
  orange: '#ff6f2c', //橙色
  yellow: '#fcb400', //黄色
  green: '#20c933', //绿色
  teal: '#20d9d2', //蓝绿色
  cyan: '#18bfff', //青色
  blue: '#2d7ff9', //蓝色
  pink: '#ff08c2', //粉色
  purple: '#8b46ff', //紫色
  gray: '#666666', //灰色
  redLight: '#ffdce5', //浅红色
  orangeLight: '#fee2d5', //浅橙色
  yellowLight: '#ffeab6', //浅黄色
  greenLight: '#d1f7c4', //浅绿色
  tealLight: '#c2f5e9', //浅蓝绿色
  cyanLight: '#d0f0fd', //浅青色
  blueLight: '#cfdfff', //浅蓝色
  pinkLight: '#ffdaf6', //浅粉色
  purpleLight: '#ede2fe', //浅紫色
  grayLight: '#eeeeee', //浅灰色
};

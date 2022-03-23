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

export const textColors: Record<string, string> = {
  blue1: '#0E5A8A',
  violet1: '#5C255C',
  green1: '#0A6640',
  red1: '#A82A2A',
  turquoisel1: '#008075',
  lime1: '#728C23',
  sepial1: '#63411E',
  orange1: '#A66321',

  blue2: '#106BA3',
  violet2: '#752F75',
  green2: '#0D8050',
  red2: '#C23030',
  turquoisel2: '#00998C',
  lime2: '#87A629',
  sepial2: '#7D5125',
  orange2: '#BF7326',

  blue3: '#137CBD',
  violet3: '#8F398F',
  green3: '#0F9960',
  red3: '#DB3737',
  turquoisel3: '#00B3A4',
  lime3: '#9BBF30',
  sepial3: '#96622D',
  orange3: '#D9822B',

  blue4: '#2B95D6',
  violet4: '#A854A8',
  green4: '#15B371',
  red4: '#F55656',
  turquoisel4: '#14CCBD',
  lime4: '#B6D94C',
  sepial4: '#B07B46',
  orange4: '#F29D49',

  blue5: '#48AFF0',
  violet5: '#C274C2',
  green5: '#3DCC91',
  red5: '#FF7373',
  turquoisel5: '#2EE6D6',
  lime5: '#D1F26D',
  sepial5: '#C99765',
  orange5: '#FFB366',
};

export const BaseColors = {
  black: '#10161A',
  white: '#FFFFFF',
  darkGary1: '#182026',
  darkGary2: '#202B33',
  darkGary3: '#293742',
  darkGary4: '#30404D',
  darkGary5: '#394B59',
  gary1: '#5C7080',
  gary2: '#738694',
  gary3: '#8A9BA8',
  gary4: '#A7B6C2',
  gary5: '#BFCCD6',
  lightGary1: '#CED9E0',
  lightGary2: '#D8E1E8',
  lightGary3: '#E1E8ED',
  lightGary4: '#EBF1F5',
  lightGary5: '#F5F8FA',
  forest1: '#1D7324',
  forest2: '#238C2C',
  forest3: '#29A634',
  forest4: '#43BF4D',
  forest5: '#62D96B',
  blue1: '#0E5A8A',
  blue2: '#106BA3',
  blue3: '#137CBD',
  blue4: '#2B95D6',
  blue5: '#48AFF0',
};

export enum FontColor {
  black = '#202B33',
  white = '#F5F8FA',
}

const IconColorTypeArr = [
  'blue',
  'cyan',
  'purple',
  'teal',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'gray',
  'blueLight',
  'cyanLight',
  'purpleLight',
  'tealLight',
  'pinkLight',
  'redLight',
  'orangeLight',
  'yellowLight',
  'greenLight',
  'grayLight',
] as const;

export type IconColorType = typeof IconColorTypeArr[number];

export const iconColors: Record<IconColorType, string> = {
  blue: '#2d7ff9', //蓝色
  cyan: '#18bfff', //青色
  purple: '#8b46ff', //紫色
  teal: '#02AAA4', //蓝绿色
  pink: '#ff08c2', //粉色
  red: '#f82b60', //红色
  orange: '#ff6f2c', //橙色
  yellow: '#fcb400', //黄色
  green: '#20c933', //绿色
  gray: '#666666', //灰色
  blueLight: '#cfdfff', //浅蓝色
  cyanLight: '#d0f0fd', //浅青色
  purpleLight: '#ede2fe', //浅紫色
  tealLight: '#c2f5e9', //浅蓝绿色
  pinkLight: '#ffdaf6', //浅粉色
  redLight: '#ffdce5', //浅红色
  orangeLight: '#fee2d5', //浅橙色
  yellowLight: '#ffeab6', //浅黄色
  greenLight: '#d1f7c4', //浅绿色
  grayLight: '#eeeeee', //浅灰色
};

/*********************颜色基本函数*****************************/
//RGB字符串转hex颜色
function RgbStringToHex(str: string) {
  const rgbReg = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i;
  if (!rgbReg.test(str)) throw new Error('Invalid RGB color.');
  const colorArr = str.replace(/(?:\(|\)|rgb|RGB|\s)*/g, '').split(',');
  const hexes = colorArr.map((color) => {
    let hexString = parseInt(color).toString(16);
    if (hexString.length == 1) hexString = '0' + hexString;
    return hexString;
  });
  return '#' + hexes.join('');
}

//hex颜色转rgb颜色
function HexToRgb(str: string) {
  const rgbReg = /^rgb/i;
  if (rgbReg.test(str)) str = RgbStringToHex(str);
  const r = /^#?[0-9A-F]{6}$/;
  str = str.toUpperCase();
  //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
  if (!r.test(str)) throw new Error('Invalid HEX color.');
  //replace替换查找的到的字符串
  str = str.replace('#', '');
  //match得到查询数组
  const hexes = str.match(/../g);
  let rex: number[] = [];
  //alert('bf:'+hxs)
  if (hexes) rex = hexes.map((hex) => parseInt(hex, 16));
  //alert(parseInt(80, 16))
  //console.log(hxs);
  return rex;
}

//GRB颜色转Hex颜色
function RgbToHex(rgb: number[]) {
  const [a, b, c] = rgb;
  const r = /^\d{1,3}$/;
  if (!r.test(String(a)) || !r.test(String(b)) || !r.test(String(c))) {
    console.log(rgb);
    throw new Error('输入错误的rgb颜色值');
  }
  const hexes = rgb.map((hex) => {
    let hexString = hex.toString(16);
    if (hexString.length == 1) hexString = '0' + hexString;
    return hexString;
  });
  return '#' + hexes.join('');
}

//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
function getDarkColor(color: string, level: number) {
  const rgb = HexToRgb(color);
  //floor 向下取整
  const tranRgb = rgb.map((r) => Math.floor(r * (1 - level)));
  return RgbToHex(tranRgb);
}

//得到hex颜色值为color的减淡颜色值，level为减淡的程度，限0-1之间
function getLightColor(color: string, level: number) {
  const rgb = HexToRgb(color);
  const tranRgb = rgb.map((r) => Math.floor((255 - r) * level + r));
  return RgbToHex(tranRgb);
}

//返回true，颜色为深色，返回false，颜色为浅色。
function isDarkOrLightColor(colorHex: string) {
  const [r, g, b] = HexToRgb(colorHex);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? false : true;
}

/***********************应用中使用到的函数*********************************/
//根据应用类型返回颜色值
export function getIconTypeColor(type: IconColorType) {
  return iconColors[type] ?? '#cfdfff';
}

//浅色系背景返回偏黑色色文字。深色背景返回偏白色文字
export function getInvertOfFontColor(backColor: string | undefined) {
  const orgColor = backColor ?? BaseColors.white;
  const isDark = isDarkOrLightColor(orgColor);
  return isDark ? BaseColors.lightGary3 : BaseColors.darkGary2;
}

//输入颜色是浅色系的时候，则加深amt,输入颜色是深色系的时候，颜色则变浅,,限level 0-1之间
export function transformColorOfSystem(org: string | undefined, level: number) {
  const orgColor = org ?? BaseColors.white;
  const isDark = isDarkOrLightColor(orgColor);
  return isDark
    ? getLightColor(orgColor, level)
    : getDarkColor(orgColor, level);
}

//输入颜色是浅色系的时候，则变浅,输入颜色是深色系的时候，颜色则加深,限level 0-1之间
export function transformInverseColorOfSystem(
  org: string | undefined,
  level: number,
) {
  const orgColor = org ?? BaseColors.white;
  const isDark = isDarkOrLightColor(orgColor);
  return isDark
    ? getDarkColor(orgColor, level)
    : getLightColor(orgColor, level);
}

//Icon组件使用的颜色函数
//amt 正数颜色变浅，负数颜色变深
//判断输入的颜色是浅色系还是深色系
//输入颜色为浅色，返回黑色，hover颜色加深40
//输入颜色为深色时，返回白色，hover颜色变浅40
export function getIconColor(iconColor: string) {
  const isDark = isDarkOrLightColor(iconColor);
  return {
    hoverColor: isDark
      ? getLightColor(iconColor, 0.2)
      : getDarkColor(iconColor, 0.2),
    inlineColor: isDark ? BaseColors.white : BaseColors.black,
  };
}

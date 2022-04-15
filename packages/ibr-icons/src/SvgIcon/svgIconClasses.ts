import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface SvgIconClasses {
  /**应用于根元素的样式。 */
  root: string;
  /** 当 `color="primary"` 应用于根元素的样式 */
  colorPrimary: string;
  /** 当 `color="secondary"`应用于根元素的样式*/
  colorSecondary: string;
  /** 当`color="action"`应用于根元素的样式*/
  colorAction: string;
  /** 当 `color="error"`应用于根元素的样式 */
  colorError: string;
  /** 当 `color="disabled"`应用于根元素的样式*/
  colorDisabled: string;
  /** 当 `fontSize="inherit"`应用于根元素的样式*/
  fontSizeInherit: string;
  /** 当 `fontSize="small"`应用于根元素的样式*/
  fontSizeSmall: string;
  /** 当 `fontSize="large"`应用于根元素的样式*/
  fontSizeLarge: string;
}

export const componentName = 'TudSvgIcon';

export type SvgIconClassKey = keyof SvgIconClasses;

export function getSvgIconUtilityClass(slot: string): string {
  return generateUtilityClass(componentName, slot);
}

const svgIconClasses: SvgIconClasses = generateUtilityClasses(componentName, [
  'root',
  'colorPrimary',
  'colorSecondary',
  'colorAction',
  'colorError',
  'colorDisabled',
  'fontSizeInherit',
  'fontSizeSmall',
  'fontSizeMedium',
  'fontSizeLarge',
]);

export default svgIconClasses;

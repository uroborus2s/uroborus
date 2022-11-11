import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface CircularProgressClasses {
  /** 应用于根元素的样式。 */
  root: string;
  /** 如果`definate`为真，则应用于根元素的样式。 */
  determinate: string;
  /** 应用于SVG元素的样式。 */
  svg: string;
  /** 应用于`track`元素的样式。 */
  track: string;
  /** 应用于`Progress`元素的样式。 */
  progress: string;
  /** 如果`color="primary"`则应用于根元素的样式。 */
  colorPrimary: string;
  /** 如果`color="neutral"`则应用于根元素的样式。 */
  colorNeutral: string;
  /** 如果`color="danger"`则应用于根元素的样式。 */
  colorDanger: string;
  /** 如果`color="info"`则应用于根元素的样式。 */
  colorInfo: string;
  /** 如果`color="success"`则应用于根元素的样式。 */
  colorSuccess: string;
  /** 如果`color="warning"`则应用于根元素的样式。 */
  colorWarning: string;
  /** 如果`size=“sm”`，则应用于根元素的样式。 */
  sizeSm: string;
  /** 如果`size=“md”`，则应用于根元素的样式。 */
  sizeMd: string;
  /** 如果`size=“lg”`，则应用于根元素的样式。 */
  sizeLg: string;
  /** 如果`variant=“plain”`，则应用于根元素的样式。 */
  variantPlain: string;
  /** 如果`variant=“outlined”`，则应用于根元素的样式。 */
  variantOutlined: string;
  /** 如果`variant=“soft”`，则应用于根元素的样式。 */
  variantSoft: string;
  /** 如果`variant=“solid”`，则应用于根元素的样式。 */
  variantSolid: string;
}

export type CircularProgressClassKey = keyof CircularProgressClasses;

export const componentName = 'UroCircularProgress';

export function getCircularProgressUtilityClass(slot: string): string {
  return generateUtilityClass(componentName, slot);
}

const circularProgressClasses: CircularProgressClasses = generateUtilityClasses(
  componentName,
  [
    'root',
    'determinate',
    'svg',
    'track',
    'progress',
    'colorPrimary',
    'colorNeutral',
    'colorDanger',
    'colorInfo',
    'colorSuccess',
    'colorWarning',
    'sizeSm',
    'sizeMd',
    'sizeLg',
    'variantPlain',
    'variantOutlined',
    'variantSoft',
    'variantSolid',
  ],
);

export default circularProgressClasses;

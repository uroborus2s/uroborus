import { ElementType } from 'react';
import { SvgIconClasses } from './svgIconClasses';
import type { ColorProdType, ComponentProps } from '@uroborus/styled';
import { OverridableStringUnion } from '@mui/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SvgIconPropsSizeOverrides {}

export interface SvgIconTypeMap<P, D extends ElementType> {
  props: P & {
    /**
     * 替代或扩展应用于组件的样式。
     */
    classes?: Partial<SvgIconClasses>;

    /**
     * 组件的颜色。
     * 您可以使用`htmlColor`道具将颜色属性应用到SVG元素。
     * @default 'inherit'
     */
    color?: ColorProdType;

    /**
     * 应用于图标的字体大小。默认为24px，但可以配置为继承字体大小。
     * @default 'medium'
     */
    fontSize?: OverridableStringUnion<
      'inherit' | 'large' | 'medium' | 'small',
      SvgIconPropsSizeOverrides
    >;

    /**
     * 将颜色属性应用于SVG元素。
     */
    htmlColor?: string;

    /**
     * 如果为`true`，则根节点将继承自定义`组件`的ViewBox，并忽略`viewBox`道具。
     * 当您想要引用一个自定义的`Component`并让`SvgIcon`将该`Component`的ViewBox传递到根节点时非常有用。
     * @default false
     */
    inheritViewBox?: boolean;

    /**
     * shape-rendering属性提示渲染器在渲染诸如路径，圆形或矩形之类的形状时要进行的取舍
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     */
    shapeRendering?: string;
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess?: string;
    /**
     * 重新定义不带单位的坐标在SVG元素中的含义
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox?: string;
  };
  defaultComponent: D;
}

export type SvgIconProps<
  D extends ElementType = 'svg',
  P = {},
> = ComponentProps<SvgIconTypeMap<P, D>, D>;

export type SvgIconOwnerState = Required<
  Pick<SvgIconProps, 'color' | 'fontSize'>
>;

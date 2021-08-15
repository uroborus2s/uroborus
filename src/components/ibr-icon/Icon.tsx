import React, {
  forwardRef,
  ForwardRefRenderFunction,
  LegacyRef,
  memo,
  MouseEventHandler,
  useState,
} from 'react';
import { BaseColors, CSSPrefixProps, getIconColor, getPrefixCls } from '@/util';
import classNames from 'classnames';
import './icon.scss';
import { IconType } from 'react-icons/lib';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

interface IconProps
  extends CSSPrefixProps,
    Omit<IconBaseProps, 'onClick' | 'color' | 'size' | 'children'> {
  outline?: 'circle' | 'square';
  colorName?: string;
  size?: number;
  icon?: IconType | null;
  button?: boolean;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  margin?: number;
  disableHover?: boolean;
  id?: string;
}

const Icon: ForwardRefRenderFunction<HTMLSpanElement, IconProps> = (
  {
    prefixCls,
    className,
    outline,
    size,
    icon,
    button,
    onClick,
    margin: marginProp,
    style: styleProp,
    colorName: colorProp,
    tabIndex,
    disableHover,
    id,
    ...other
  },
  ref,
) => {
  const preCls = getPrefixCls('icon', prefixCls);
  const outSize = size ?? 32;

  const colorName = colorProp ?? BaseColors.gary3;
  const { hoverColor, inlineColor } = getIconColor(colorName);
  const margin = marginProp ?? 5;
  const disHover = disableHover ?? false;
  let outColor;

  const [isHover, setHover] = useState(false);

  if (button && !disHover && isHover) {
    outColor = hoverColor;
  } else {
    outColor = colorName;
  }

  let buttonProps = {};

  if (button) {
    const onMouseOver = () => {
      setHover(true);
    };

    const onMouseOut = () => {
      setHover(false);
    };

    buttonProps = { onClick, onMouseOver, onMouseOut };
  }

  const style = {
    backgroundColor: outColor,
    width: `${outSize}px`,
    height: `${outSize}px`,
    margin: `0 ${margin}px`,
  };
  const SVG = icon;
  const svgSize = Math.floor(outSize / 2);
  const svgOffset = Math.floor((outSize - svgSize) / 2);
  const svgColor = inlineColor;
  const outClass = classNames(
    preCls,
    {
      [`${preCls}-circle`]: outline === 'circle',
      [`${preCls}-square`]: outline === 'square',
      [`${preCls}-button`]: button,
    },
    className,
  );

  return (
    <>
      {outline ? (
        <span
          style={{ ...style, ...styleProp }}
          className={outClass}
          ref={ref as LegacyRef<HTMLSpanElement>}
          tabIndex={tabIndex}
          id={id}
          {...buttonProps}
        >
          {SVG && (
            <SVG
              size={svgSize}
              color={svgColor}
              style={{
                position: 'absolute',
                top: `${svgOffset}px`,
                left: `${svgOffset}px`,
              }}
              {...other}
            ></SVG>
          )}
        </span>
      ) : (
        <span
          className={outClass}
          ref={ref as LegacyRef<HTMLSpanElement>}
          style={{ margin: `0 ${margin}px`, ...styleProp }}
          tabIndex={tabIndex}
          id={id}
          {...buttonProps}
        >
          {SVG && <SVG size={size ?? 16} color={outColor} {...other}></SVG>}
        </span>
      )}
    </>
  );
};

export default memo(forwardRef(Icon));

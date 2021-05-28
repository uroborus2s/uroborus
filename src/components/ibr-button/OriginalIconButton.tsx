import React, {
  ForwardRefRenderFunction,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';
import { IconType } from 'react-icons';
import { getPrefixCls } from '@/util';
import classNames from 'classnames';

type OriginalIconProps = {
  component: IconType;
  hoverColor?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
} & Omit<IconBaseProps, 'onClick'>;

const OriginalIconButton: ForwardRefRenderFunction<
  HTMLDivElement,
  OriginalIconProps
> = (
  { onClick, component, color, className, children, hoverColor, ...other },
  ref,
) => {
  const [currentColor, setColor] = useState(color);

  const handleMouseOver = () => {
    if (hoverColor) setColor(hoverColor);
  };

  const handleMouseOut = () => {
    if (color) setColor(color);
  };

  // useEffect(() => {
  //   cRef.current?.addEventListener('mouseover', handleMouseOver);
  //   cRef.current?.addEventListener('mouseout', handleMouseOut);
  //   return () => {
  //     cRef.current?.removeEventListener('mouseover', handleMouseOver);
  //     cRef.current?.removeEventListener('mouseout', handleMouseOut);
  //   };
  // }, []);

  useEffect(() => {
    setColor(color);
  }, [color]);

  const prefixClsBase = getPrefixCls('basis');

  const divClass = classNames(
    prefixClsBase.concat('-flex'),
    prefixClsBase.concat('-items-center'),
    prefixClsBase.concat('-cursor-pointer'),
    className,
  );

  return React.createElement(
    'div',
    {
      className: divClass,
      onMouseOver: handleMouseOver,
      onMouseOut: handleMouseOut,
      ref: ref,
      onClick: onClick,
    },
    React.createElement(
      component,
      {
        color: currentColor,
        ...other,
      },
      children,
    ),
  );
};

export default React.forwardRef(OriginalIconButton);

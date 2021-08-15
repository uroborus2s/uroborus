import { CSSPrefixRequiredProps } from '@/util';
import React, { MouseEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AppPageSideWidth } from '@/pages/application/data-mode';
import useRaf from '@/util/hooks/useRaf';

const MoveDivider: React.FC<CSSPrefixRequiredProps> = ({ prefixCls }) => {
  const setSideWidth = useSetRecoilState(AppPageSideWidth);
  const [isDrag, setDrag] = useState(false);

  const handlerStartDrag = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isDrag) setDrag(true);
  };

  const handlerEndDrag = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isDrag) setDrag(false);
  };

  const handlerDrag = useRaf((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isDrag) {
      setSideWidth(e.clientX);
    }
  });

  return (
    <div
      className={`${prefixCls}-divider`}
      // onMouseDown={handlerStartDrag}
      // onMouseUp={handlerEndDrag}
    >
      {/*<div*/}
      {/*  onMouseMove={handlerDrag}*/}
      {/*  className={`${prefixCls}-covering`}*/}
      {/*  style={isDrag ? {} : { display: 'none' }}*/}
      {/*></div>*/}
    </div>
  );
};

export default MoveDivider;

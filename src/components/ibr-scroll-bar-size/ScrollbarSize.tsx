import React, { createContext, useEffect, useState } from 'react';
import { scrollBarSize, useResizeObserver } from '@/util';

const ScrollBarSizeContext = createContext<scrollBarSize>({
  wight: 0,
  height: 0,
});

const ScrollBarSize: React.FC = ({ children }) => {
  const nodeRef = React.useRef<HTMLDivElement>();
  const { width, height, clientWidth, clientHeight } = useResizeObserver(
    nodeRef,
  );
  const [size, setSize] = useState({ wight: 0, height: 0 });
  useEffect(() => {
    setSize({ wight: width - clientWidth, height: height - clientHeight });
  }, [width, height, clientWidth, clientHeight]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          overflow: 'scroll',
          width: 99,
          height: 99,
          top: -999,
        }}
        // @ts-ignore
        ref={nodeRef}
        id="scroll size"
      ></div>
      <ScrollBarSizeContext.Provider value={size}>
        {children}
      </ScrollBarSizeContext.Provider>
    </>
  );
};

export { ScrollBarSizeContext };
export default ScrollBarSize;

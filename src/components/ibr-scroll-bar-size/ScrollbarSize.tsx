import React, { useEffect } from 'react';
import UseDebounce from '@/util/hooks/useDebounce';
import { atom, useSetRecoilState } from 'recoil';

export const windowScrollBarSize = atom({
  key: 'windowResize',
  default: {
    scrollWidth: 0,
    scrollHeight: 0,
    windowsWidth: 0,
    windowsHeight: 0,
  },
});

const ScrollBarSize: React.FC = ({ children }) => {
  const nodeRef = React.useRef<HTMLDivElement>();
  const setSize = useSetRecoilState(windowScrollBarSize);

  const handleResize = UseDebounce(() => {
    let width = 0;
    let clientHeight = 0;
    let height = 0;
    let clientWidth = 0;
    if (nodeRef.current) {
      const rect = nodeRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      clientHeight = nodeRef.current.clientHeight;
      clientWidth = nodeRef.current.clientWidth;
    }
    console.log('窗口的大小', clientWidth, clientHeight, width, height);
    setSize({
      scrollWidth: Math.floor(width - clientWidth),
      scrollHeight: Math.floor(height - clientHeight),
      windowsWidth: clientWidth,
      windowsHeight: clientHeight,
    });
  }, 200);

  useEffect(() => {
    handleResize();
    window.onresize = handleResize;
    // window.addEventListener('resize', handleResize);
    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <div
        style={{
          boxSizing: 'border-box',
          position: 'fixed',
          overflow: 'scroll',
          width: '20vw',
          height: '20vh',
          visibility: 'hidden',
          top: 0,
          left: 0,
        }}
        // @ts-ignore
        ref={nodeRef}
        id="scroll size"
      ></div>
      {children}
    </>
  );
};

export default ScrollBarSize;

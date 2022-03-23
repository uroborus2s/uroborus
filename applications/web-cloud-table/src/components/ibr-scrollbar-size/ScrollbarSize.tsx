import styled from '@mui/material/styles/styled';
import debounce from 'lodash.debounce';
import React, { LegacyRef, useEffect } from 'react';
import { atom, useRecoilTransaction_UNSTABLE } from 'recoil';

export const windowScrollBarWidth = atom({
  key: 'WindowScrollBarSize',
  default: 0,
});

export const windowScrollBarHeight = atom({
  key: 'WindowScrollBarHeight',
  default: 0,
});

const ScrollBar = styled('div')({
  boxSizing: 'border-box',
  position: 'absolute',
  overflow: 'scroll',
  width: 99,
  height: 99,
  visibility: 'hidden',
  top: -9999,
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none', // Safari + Chrome
  },
});

const ScrollBarSize: React.FC = () => {
  const nodeRef = React.useRef<HTMLDivElement>();

  const updateSize = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      (elem: HTMLDivElement) => {
        set(windowScrollBarWidth, elem.offsetWidth - elem.clientWidth);
        set(windowScrollBarHeight, elem.offsetHeight - elem.clientHeight);
      },
    [],
  );

  useEffect(() => {
    console.log('render scrollbar size effect');

    const nodeElem = nodeRef.current;

    const handleResize = debounce(() => {
      if (nodeElem) {
        updateSize(nodeElem);
      }
    }, 200);
    // window.onresize = handleResize;
    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ScrollBar ref={nodeRef as LegacyRef<HTMLDivElement>} id="scroll size" />
  );
};

export default ScrollBarSize;

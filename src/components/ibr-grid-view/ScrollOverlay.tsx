import { useSize } from '@/core/hooks';
import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import styled from '@mui/material/styles/styled';
import {
  defaultColumnHeaderHight,
  defaultRowHight,
  gridScrollLeft,
  gridScrollTop,
  rowNumberWidth,
} from './Context';
import { LegacyRef, UIEvent, useRef } from 'react';
import {
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import useRafFun from '@/core/hooks/useRafFun';

const ScrollRoot = styled('div')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: defaultColumnHeaderHight,
  bottom: 0,
  zIndex: 4,
  pointerEvents: 'none',
  opacity: 0.7,
  overflow: 'hidden',
});

const ScrollInner = styled('div')({
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
    width: 0,
    height: 0,
  },
});

const ScrollBar = styled('div')({
  pointerEvents: 'auto',
  zIndex: 2,
  backgroundColor: 'hsla(0,0%,0%,0.28)',
  boxShadow: 'inset 0 0 0 1px hsl(0deg 0% 100%)',
  borderRadius: '7px',
  position: 'absolute',
  '&:hover': {
    backgroundColor: 'hsla(0,0%,0%,0.4)',
  },
});

const HorizontalScrollBar = styled(ScrollBar)({
  height: '10px',
  marginLeft: '2px',
  left: 0,
  bottom: '2px',
});

const VerticalScrollBar = styled(ScrollBar)({
  width: '10px',
  marginTop: '2px',
  top: 0,
  right: '2px',
});

const ScrollOverlay = () => {
  const overlayRef = useRef<HTMLDivElement>();

  const { offsetHeight, offsetWidth } = useSize(overlayRef);

  const viewId = useRecoilValue(currentViewIdState);

  const maxWidth = useRecoilValue(view.colWidths(viewId)) + rowNumberWidth;

  const maxHeigth = useRecoilValue(view.rowsSize(viewId)) * defaultRowHight;

  const [scrollTop, setScrollTop] = useRecoilState(gridScrollTop);

  const [scrollLeft, setScrollLeft] = useRecoilState(gridScrollLeft);

  let horizontalScrollBlockLength = 0;
  let verticalScrollBlockLength = 0;

  if (maxWidth > offsetWidth) {
    horizontalScrollBlockLength = Math.pow(offsetWidth, 2) / maxWidth;
  }

  if (maxHeigth > offsetHeight) {
    verticalScrollBlockLength = Math.pow(offsetHeight, 2) / maxHeigth;
  }

  const handleOnScroll = useRafFun(
    useRecoilTransaction_UNSTABLE(() => (event: UIEvent<HTMLDivElement>) => {
      console.log(event.target);
      const scrollTop = (event.target as HTMLDivElement).scrollTop;
      const scrollLeft = (event.target as HTMLDivElement).scrollLeft;
      setScrollTop(scrollTop);
      setScrollLeft(scrollLeft);
    }),
  );

  return (
    <ScrollRoot ref={overlayRef as LegacyRef<HTMLDivElement>}>
      <ScrollInner
        style={{ width: offsetWidth, height: offsetHeight }}
        onScroll={handleOnScroll}
      >
        <div style={{ width: maxWidth, height: maxHeigth }} />
      </ScrollInner>
      {horizontalScrollBlockLength > 0 && (
        <HorizontalScrollBar
          style={{
            width: horizontalScrollBlockLength,
            transform: `translateX(${scrollLeft}px)`,
          }}
        />
      )}
      {verticalScrollBlockLength > 0 && (
        <VerticalScrollBar
          style={{
            height: verticalScrollBlockLength,
            transform: `translateY(${scrollTop}px)`,
          }}
        />
      )}
    </ScrollRoot>
  );
};

export default ScrollOverlay;

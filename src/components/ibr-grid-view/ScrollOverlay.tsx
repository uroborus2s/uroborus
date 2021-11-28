import { useSize } from '@/core/hooks';
import useRafFun from '@/core/hooks/useRafFun';
import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import styled from '@mui/material/styles/styled';
import {
  ComponentPropsWithoutRef,
  FC,
  LegacyRef,
  UIEvent,
  useEffect,
  useRef,
} from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  defaultColumnHeaderHight,
  defaultSummaryBarHight,
  gridScrollLeft,
  gridScrollTop,
  rowHeight,
  rowNumberWidth,
} from './Context';
import { ScrollBarProps } from './types';
import useGridMoveScrollThumb from './useGridMoveScrollThumb';

const ScrollRoot = styled('div')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: defaultColumnHeaderHight,
  bottom: 0,
  zIndex: 4,
  overflow: 'hidden',
  display: 'inline-block',
});

const ScrollInner = styled('div')({
  overflow: 'scroll',
  display: 'inline-block',
  width: '100%',
  height: '100%',
  '&::-webkit-scrollbar': {
    display: 'none',
    width: 0,
    height: 0,
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

const ScrollBar = styled('div')({
  pointerEvents: 'auto',
  zIndex: 2,
  backgroundColor: 'hsla(0,0%,0%,0.28)',
  boxShadow: 'inset 0 0 0 1px hsl(0deg 0% 100%)',
  borderRadius: '8px',
  position: 'absolute',
  '&:hover': {
    backgroundColor: 'hsla(0,0%,0%,0.4)',
  },
});

const HorizontalScrollBarRoot = styled(ScrollBar)({
  height: '10px',
  marginLeft: '2px',
  left: 0,
  bottom: '2px',
});

const HorizontalScrollBar: FC<ScrollBarProps> = ({ maxWidth, scrollWidth }) => {
  const { handleMouseDown, barOffset } = useGridMoveScrollThumb(
    'horizontal',
    gridScrollLeft,
    maxWidth,
    scrollWidth,
  );

  const length = scrollWidth.current;

  const thumbLength = (length * length) / maxWidth;

  const transForm = `translateX(${barOffset}px)`;

  return (
    <HorizontalScrollBarRoot
      onMouseDownCapture={handleMouseDown}
      style={{
        width: thumbLength,
        transform: transForm,
      }}
    />
  );
};

const VerticalScrollBarRoot = styled(ScrollBar)({
  width: '10px',
  marginTop: '2px',
  top: 0,
  right: '2px',
});

const VerticalScrollBar: FC<ScrollBarProps> = ({ maxHeight, scrollHeight }) => {
  const { handleMouseDown, barOffset } = useGridMoveScrollThumb(
    'vertical',
    gridScrollTop,
    maxHeight,
    scrollHeight,
  );

  const length = scrollHeight.current;

  const thumbLength = (length * length) / maxHeight;

  const transForm = `translateY(${barOffset}px)`;

  return (
    <VerticalScrollBarRoot
      onMouseDownCapture={handleMouseDown}
      style={{ height: thumbLength, transform: transForm }}
    />
  );
};

const ScrollOverlay: FC<ComponentPropsWithoutRef<'div'>> = (props) => {
  const overlayRef = useRef<HTMLDivElement>();

  const rect = useSize(overlayRef);

  const clientHeight = useRef(rect.clientHeight - defaultSummaryBarHight);

  clientHeight.current = rect.clientHeight - defaultSummaryBarHight;

  const clientWdith = useRef(rect.clientWdith);

  clientWdith.current = rect.clientWdith;

  const viewId = useRecoilValue(currentViewIdState);

  const maxWidth =
    useRecoilValue(view.colWidths(viewId)) + rowNumberWidth + 160;

  const rHeight = useRecoilValue(rowHeight);

  const maxHeigth = useRecoilValue(view.rowsSize(viewId)) * rHeight + 160;

  const handleOnScroll = useRafFun(
    useRecoilCallback(
      ({ set }) =>
        (event: UIEvent<HTMLDivElement>) => {
          console.log(event.target);
          const scrollTop = (event.target as HTMLDivElement).scrollTop;
          console.log(scrollTop);

          set(gridScrollTop, scrollTop);
        },
      [],
    ),
  );

  const setWidth = useSetRecoilState(gridScrollLeft);

  useEffect(() => {
    if (clientWdith.current >= maxWidth) {
      setWidth((prev) => {
        if (prev != 0) return 0;
        else return prev;
      });
    }
  }, [clientWdith.current]);

  return (
    <ScrollRoot
      // ref={overlayRef as LegacyRef<HTMLDivElement>}
      {...props}
    >
      <ScrollInner
        ref={overlayRef as LegacyRef<HTMLDivElement>}
        onScroll={handleOnScroll}
      >
        <div style={{ width: maxWidth, height: maxHeigth }} />
      </ScrollInner>

      {/*水平的滚动栏*/}
      {maxWidth > clientWdith.current && (
        <HorizontalScrollBar
          maxHeight={maxHeigth}
          maxWidth={maxWidth}
          scrollHeight={clientHeight}
          scrollWidth={clientWdith}
        />
      )}
      {/*垂直的滚动栏*/}
      {maxHeigth > clientHeight.current && (
        <VerticalScrollBar
          maxHeight={maxHeigth}
          maxWidth={maxWidth}
          scrollHeight={clientHeight}
          scrollWidth={clientWdith}
        />
      )}
    </ScrollRoot>
  );
};

export default ScrollOverlay;

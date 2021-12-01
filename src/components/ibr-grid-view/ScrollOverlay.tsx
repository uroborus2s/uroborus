import { useSize } from '@/core/hooks';
import useRafFun from '@/core/hooks/useRafFun';
import { view } from '@/domain/view/view.repository';
import { currentViewIdState } from '@/pages/base/content/table/TableContext';
import styled from '@mui/material/styles/styled';
import {
  FC,
  HTMLAttributes,
  LegacyRef,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useRecoilValue } from 'recoil';
import {
  addButtonMaxWidth,
  defaultColumnHeaderHight,
  defaultSummaryBarHight,
  GridScrollDispatch,
  GridScrollLeft,
  GridScrollTop,
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

const HorizontalScrollBar: FC<ScrollBarProps> = ({
  maxWidth = 0,
  thumbLength,
  scrollInnerRef,
  scrollOffsetContext,
  scrollWidth = 0,
}) => {
  const handleMouseDown = useGridMoveScrollThumb(
    'horizontal',
    scrollWidth,
    maxWidth,
    scrollInnerRef,
  );

  const offset = useContext(scrollOffsetContext);

  let thumbOffset = 0;
  if (scrollWidth && maxWidth) thumbOffset = (offset * scrollWidth) / maxWidth;

  const transForm = `translateX(${thumbOffset}px)`;

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

const VerticalScrollBar: FC<ScrollBarProps> = ({
  maxHeight = 0,
  scrollHeight = 0,
  scrollInnerRef,
  scrollOffsetContext,
  thumbLength,
}) => {
  const handleMouseDown = useGridMoveScrollThumb(
    'vertical',
    scrollHeight,
    maxHeight,
    scrollInnerRef,
  );

  const offset = useContext(scrollOffsetContext);

  let thumbOffset = 0;
  if (scrollHeight && maxHeight)
    thumbOffset = (offset * scrollHeight) / maxHeight;

  const transForm = `translateY(${thumbOffset}px)`;

  return (
    <VerticalScrollBarRoot
      onMouseDownCapture={handleMouseDown}
      style={{ height: thumbLength, transform: transForm }}
    />
  );
};

const ScrollOverlay: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const overlayRef = useRef<HTMLDivElement>();

  const rect = useSize(overlayRef);

  const clientHeight = rect.clientHeight - defaultSummaryBarHight;

  const clientWdith = rect.clientWdith;

  const viewId = useRecoilValue(currentViewIdState);

  const maxWidth =
    useRecoilValue(view.colWidths(viewId)) + rowNumberWidth + addButtonMaxWidth;

  const rHeight = useRecoilValue(rowHeight);

  const maxHeigth =
    useRecoilValue(view.rowsSize(viewId)) * rHeight + addButtonMaxWidth;

  const dispatch = useContext(GridScrollDispatch);

  const handleOnScroll = useRafFun((event: Event) => {
    const scrollTop = (event.target as HTMLDivElement).scrollTop;
    const scrollLeft = (event.target as HTMLDivElement).scrollLeft;
    dispatch!({ type: 'top', offset: scrollTop });
    dispatch!({ type: 'left', offset: scrollLeft });
  });

  const horizontalThumbLength = useMemo(() => {
    if (clientWdith < maxWidth) {
      return (clientWdith * clientWdith) / maxWidth;
    } else return 0;
  }, [clientWdith, maxWidth]);

  const verticalThumbLength = useMemo(() => {
    if (clientHeight >= 0 && clientHeight < maxHeigth) {
      return (clientHeight * clientHeight) / maxHeigth;
    } else return 0;
  }, [clientHeight, maxHeigth]);

  useEffect(() => {
    if (overlayRef.current) {
      if (horizontalThumbLength == 0) {
        overlayRef.current.scrollLeft = 0;
      }
      if (verticalThumbLength == 0) {
        overlayRef.current.scrollTop = 0;
      }
    }
  }, [horizontalThumbLength, verticalThumbLength]);

  useEffect(() => {
    overlayRef.current?.addEventListener('scroll', handleOnScroll);

    return () => {
      overlayRef.current?.removeEventListener('scroll', handleOnScroll);
    };
  }, []);

  return (
    <ScrollRoot
      // ref={overlayRef as LegacyRef<HTMLDivElement>}
      {...props}
    >
      <ScrollInner ref={overlayRef as LegacyRef<HTMLDivElement>}>
        <div style={{ width: maxWidth, height: maxHeigth }} />
      </ScrollInner>
      水平的滚动栏
      {horizontalThumbLength > 0 && (
        <HorizontalScrollBar
          maxWidth={maxWidth}
          scrollWidth={clientWdith}
          thumbLength={horizontalThumbLength}
          scrollInnerRef={overlayRef}
          scrollOffsetContext={GridScrollLeft}
        />
      )}
      {/*垂直的滚动栏*/}
      {verticalThumbLength > 0 && (
        <VerticalScrollBar
          maxHeight={maxHeigth}
          scrollHeight={clientHeight}
          scrollInnerRef={overlayRef}
          scrollOffsetContext={GridScrollTop}
          thumbLength={verticalThumbLength}
        />
      )}
    </ScrollRoot>
  );
};

export default memo(ScrollOverlay);

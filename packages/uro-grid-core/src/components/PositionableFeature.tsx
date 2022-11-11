import { FC, PropsWithChildren } from 'react';
import { ResizableStructure } from '@/hooks/usePositionableFeature';

export interface PositionableProps {
  resizable: boolean | ResizableStructure;
  popup?: boolean;
  minWidth?: number | null;
  width?: number | string | null;
  minHeight?: number | null;
  height?: number | string | null;
  centered?: boolean | null;
  calculateTopBuffer?: () => number;
  /**
   * Used for when a popup needs to be resized by an element within itself
   * In that case, the feature will configured as `popup=false` but the offsetParent
   * needs to be the popupParent.
   */
  forcePopupParentAsOffsetParent?: boolean;
  x?: number | null;
  y?: number | null;
}

const PositionableFeature: FC<PropsWithChildren<PositionableProps>> = ({
  popup = false,
  minHeight,
  minWidth,
  resizable,
}) => {
  if (typeof resizable === 'boolean' && resizable === false) {
    return null;
  }
  return <div />;
};

PositionableFeature.defaultProps = {
  popup: false,
};

export default PositionableFeature;

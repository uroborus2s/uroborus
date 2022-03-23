import { useSize } from '@/core/hooks';
import { BasicTarget } from '@/core/util';
import { maxScreen, middleScreen } from '@/pages/home/types';
import trimEnd from 'lodash.trimend';
import { useCallback, useRef } from 'react';

export interface WorkspaceItemRect {
  itemLeft: number;
  itemWidth: number;
  listHeight: number;
  listWidth: number;
}

export default function (ref: BasicTarget): WorkspaceItemRect {
  const resRef = useRef({
    itemLeft: 0,
    itemWidth: 0,
    listHeight: 0,
    listWidth: 0,
  });

  const onResize = useCallback(({ offsetWidth, offsetHeight }) => {
    const globalFontSize = Number(
      trimEnd(
        getComputedStyle(document.documentElement).fontSize.trim(),
        'px',
      ).trim(),
    );
    let left = 0;
    let itemWidth = 0;
    if (offsetWidth) {
      const maxScreenWidth = maxScreen * globalFontSize;
      const maxConentWidth = (maxScreen - 2) * globalFontSize;

      const midieScreenWidth = middleScreen * globalFontSize;

      const maxItemWidth = 800;
      const maxOffset = maxConentWidth - maxItemWidth;

      if (offsetWidth >= maxScreenWidth) {
        itemWidth = maxItemWidth;
        left = (offsetWidth - maxConentWidth) / 2 + maxOffset;
      } else if (offsetWidth >= midieScreenWidth) {
        const k = 0.2 / (maxScreenWidth - midieScreenWidth);
        const b = 0.6 - k * maxScreenWidth;
        const rate = k * offsetWidth + b;
        const reduce = maxScreenWidth - offsetWidth;
        left = Math.trunc(maxOffset + globalFontSize - reduce * rate);
        itemWidth = offsetWidth - globalFontSize - left;
      } else {
        left = globalFontSize;
        itemWidth = offsetWidth - 2 * globalFontSize;
      }
    }
    resRef.current = {
      itemLeft: left,
      itemWidth: itemWidth,
      listHeight: offsetHeight,
      listWidth: offsetWidth,
    };
  }, []);

  useSize(ref, onResize, {
    type: 'throttle',
    wait: 500,
  });

  return resRef.current;
}

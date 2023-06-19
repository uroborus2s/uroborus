import type { BoxModel } from 'css-box-model';
import { getRect } from 'css-box-model';

import { type Axis } from '../Axis.js';
import type { PlaceholderInSubject } from '../interface/IPlaceholder.js';
import type { IScrollable } from '../interface/IScrollable.js';

import { offsetByPosition } from './position.js';

interface subjectArgs {
  page: BoxModel;
  withPlaceholder?: PlaceholderInSubject;
  axis: Axis;
  frame?: IScrollable;
}

export default ({
  page: { marginBox },
  frame,
  withPlaceholder,
  axis: { end, line },
}: subjectArgs) => {
  const scrolled = frame
    ? offsetByPosition(marginBox, frame.scroll.diff.displacement)
    : marginBox;

  const increased =
    withPlaceholder && withPlaceholder.increasedBy
      ? {
          ...scrolled,
          [end]: scrolled[end] + withPlaceholder.increasedBy[line],
        }
      : scrolled;
  const clipped = frame && frame.shouldClipSubject ? {} : getRect(increased);

  return clipped;
};

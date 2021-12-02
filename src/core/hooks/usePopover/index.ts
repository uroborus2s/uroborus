import { BasicTarget, getTargetElement, TargetElement } from '@/core/util';
import { MouseEvent, KeyboardEvent, useState } from 'react';

export default function (target?: BasicTarget<TargetElement>) {
  const [anchorElem, setAnchorEl] = useState<TargetElement | null>(null);

  const openPopover = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    currentTarget?: BasicTarget<TargetElement>,
  ) => {
    const localTarget = getTargetElement(currentTarget ?? target);
    if (localTarget) setAnchorEl(localTarget);
    else setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return { anchorElem, openPopover: openPopover, closePopover };
}

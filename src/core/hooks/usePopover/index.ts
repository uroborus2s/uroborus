import { BasicTarget, getTargetElement, TargetElement } from '@/core/util';
import { MouseEvent, KeyboardEvent, useState } from 'react';

export default function (target?: BasicTarget<TargetElement>) {
  const [anchorElem, setAnchorEl] = useState<TargetElement | undefined | null>(
    null,
  );

  const oppenPopover = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => {
    const currentTarget = getTargetElement(target);
    if (currentTarget) setAnchorEl(currentTarget);
    else setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return { anchorElem, oppenPopover, closePopover };
}

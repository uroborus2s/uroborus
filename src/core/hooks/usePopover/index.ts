import { MouseEvent, KeyboardEvent, useState } from 'react';

export default function () {
  const [anchorElem, setAnchorEl] = useState<HTMLElement | null>(null);

  const oppenPopover = (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return { anchorElem, oppenPopover, closePopover };
}

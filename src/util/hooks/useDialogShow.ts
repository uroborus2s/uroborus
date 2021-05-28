import React, { useCallback, useState } from 'react';

export default function <T extends HTMLElement>() {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback((event: React.MouseEvent<T>): void => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = (event: React.MouseEvent<T>): void => {
    event.stopPropagation();
    setOpen(false);
  };

  return { open, handleOpen, handleClose };
}

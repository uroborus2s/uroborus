import React from 'react';

export default function <T extends HTMLElement>() {
  const [anchorEl, setAnchorEl] = React.useState<T | null>(null);

  const handleOpen = (event: React.MouseEvent<T>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return { anchorEl, handleOpen, handleClose };
}

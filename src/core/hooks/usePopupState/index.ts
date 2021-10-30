import { SyntheticEvent, useState } from 'react';

export type Variant = 'popover' | 'popper';

export type PopupState = {
  open: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement | null) => void;
  close: () => void;
  toggle: (eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement | null) => void;
  onMouseLeave: (event: SyntheticEvent<any>) => void;
  setOpen: (
    open: boolean,
    eventOrAnchorEl?: SyntheticEvent<any> | HTMLElement,
  ) => void;
  isOpen: boolean;
  anchorEl: HTMLElement | undefined;
  setAnchorEl: (anchorEl: HTMLElement) => any;
  setAnchorElUsed: boolean;
  disableAutoFocus: boolean;
  popupId: string | undefined;
  variant: Variant;
  _childPopupState: PopupState | undefined;
  _setChildPopupState: (popupState: PopupState | null | undefined) => void;
};

export default function (options: {
  parentPopupState?: PopupState | null | undefined;
  popupId: string | null | undefined;
  variant: Variant;
  disableAutoFocus?: boolean | null;
}) {
  const { parentPopupState, popupId, variant, disableAutoFocus } = options;

  const [state, setState] = useState();
}

import { MutableRefObject } from 'react';
import useFocusService from './useFocusService';
import { useEffectOnce } from "../../../uro-sense";

export interface ManagedFocusCallbacks {
  shouldStopEventPropagation?: (e: KeyboardEvent) => boolean;
  onTabKeyDown?: (e: KeyboardEvent) => void;
  handleKeyDown?: (e: KeyboardEvent) => void;
  onFocusIn?: (e: FocusEvent) => void;
  onFocusOut?: (e: FocusEvent) => void;
}

export default (
  callbacks: ManagedFocusCallbacks = {},
) => {



  useEffectOnce(()=>{})


};

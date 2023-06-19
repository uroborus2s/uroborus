import type { ReactNode } from 'react';
import { KeyboardEvent } from 'react';

export interface BaseDropZonePanelProps {
  vertical?: boolean;
  dragAndDropIcon: string;
  emptyMessage: string;
  title: string;
  icon: ReactNode;
  shouldStopEventPropagation?: (event: KeyboardEvent) => boolean;
}

export interface DropZoneOwnerState {
  vertical?: boolean;
}

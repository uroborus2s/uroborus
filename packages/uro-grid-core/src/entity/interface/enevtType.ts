import { EventType } from '@uroborus/core';
import { Layout } from '@/entity/interface/domLayout';

export interface ToolPanelVisibleChangedEvent extends EventType {
  source: string | undefined;
}

export interface PasteStartEvent extends EventType {
  source: string;
}

export interface PasteEndEvent extends EventType {
  source: string;
}

export interface DomLayoutEvent extends EventType {
  domLayout?: Layout;
}

export interface GridSizeChangedEvent extends EventType {
  /** The grid's DIV's clientWidth */
  clientWidth: number;
  /** The grid's DIV's clientHeight */
  clientHeight: number;
}

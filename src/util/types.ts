import React from 'react';

//基本模版
export interface IdMode {
  id: string;
}

export interface IdNameMode extends IdMode {
  name: string;
}

//基本类型
export type NullableObject = Record<string, never>;

export type RecordNon<K extends keyof any, T> = {
  [P in K]?: T;
};

export interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface CSSPrefixProps extends CommonProps {
  prefixCls?: string;
}

export interface CSSPrefixRequiredProps extends CommonProps {
  prefixCls: string;
}

export type scrollBarSize = {
  height: number;
  wight: number;
};

export const defaultPrefixCls = 'ibr';

export const baseClass = `${defaultPrefixCls}-basis`;

export const cssFlex = `${baseClass}-flex`;
export const cssFlexAuto = `${baseClass}-flex-auto`;
export const cssFlexNone = `${baseClass}-flex-none`;

export const cssFlexiCenter = `${baseClass}-items-center`;
export const cssCursorPointer = `${baseClass}-cursor-pointer`;

export const cssOverflowY = `${baseClass}-scroll-y-container`;
export const cssHoverContainer = `${baseClass}-hover-container`;
export const cssHoverDisplay = `${baseClass}-hover-display`;
export const cssHoverDisableDisplay = `${baseClass}-hover-disable-display`;
export const cssMenuContainer = `${baseClass}-menu-container`;

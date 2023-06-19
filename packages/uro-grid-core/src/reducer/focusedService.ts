import { atom } from 'recoil';

import { CellPosition } from '../interface/cellPosition.js';

import { GridAction } from './actionName.js';

export const focusedCellPositionState = atom<CellPosition | null>({
  key: '@uroborus/focused/cell/position',
  default: null,
});

export interface ClearFocusedCellOptions extends GridAction {}

export const onClearFocusedCell = ({
  type,
  ...args
}: ClearFocusedCellOptions) => {
  args.reset(focusedCellPositionState);
};

export interface ColumnEverythingChangedOptions extends GridAction {}

export const onColumnEverythingChanged = async ({
  type,
  ...args
}: ColumnEverythingChangedOptions) => {
  const focusedCellPosition = await args.snapshot.getPromise(
    focusedCellPositionState,
  );
};

import ibrGlobalUtilityClass from '@/core/ibrGlobalUtilityClass';
import generateUtilityClass from '@mui/core/generateUtilityClass';
import generateUtilityClasses from '@mui/core/generateUtilityClasses';

const slots = ['root', 'paneLine', 'dragBlock', 'tooltip', 'press'] as const;

export type MoveableDividerClassesKey = typeof slots[number];

export type VariablesizelistClasses = Record<MoveableDividerClassesKey, string>;

export const MoveableDividerCommponentName = 'IuiMoveableDivider';

export function getMoveableDividerUtilityClass(slot: string) {
  const name = ibrGlobalUtilityClass(MoveableDividerCommponentName, slot);
  if (name) return name;
  return generateUtilityClass(MoveableDividerCommponentName, slot);
}

const moveableDividerClasses = generateUtilityClasses(
  MoveableDividerCommponentName,
  [...slots],
);
export default moveableDividerClasses;

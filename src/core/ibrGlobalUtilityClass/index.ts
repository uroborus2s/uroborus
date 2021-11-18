export const globalStateClassesMapping: Record<string, string> = {
  press: 'Iui-press',
} as const;
export default function ibrGlobalUtilityClass(
  componentName: string,
  slot: string,
): string | undefined {
  return globalStateClassesMapping[slot];
}

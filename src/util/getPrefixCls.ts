export default function getPrefixCls(
  suffixCls: string | undefined | null,
  customizePrefixCls?: string,
): string {
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? 'ibr-'.concat(suffixCls) : 'ibr';
}

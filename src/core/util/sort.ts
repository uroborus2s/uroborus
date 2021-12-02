export function textSort<T = string>(
  org: T[],
  sequence: 'asce' | 'desc',
  getLable?: (data: T) => string,
) {
  const a = Array.from(org);
  const lable =
    getLable ||
    ((data) => {
      if (typeof data === 'string') return data;
      else return '';
    });

  a.sort((a, b) => {
    const r = lable(a).localeCompare(lable(b));
    return sequence == 'asce' ? r : -r;
  });

  return a;
}

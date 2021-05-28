import { GetRecoilValue, RecoilState } from 'recoil';

export function getDatesInOrder<T>(
  get: GetRecoilValue,
  orgAtom: RecoilState<Map<string, T>>,
  ordersAtom: RecoilState<string[]>,
) {
  const ords = get(ordersAtom);
  const dates = get(orgAtom);
  const newDates: T[] = [];
  if (ords)
    ords.forEach((ord) => {
      const newDate = dates.get(ord);
      if (newDate) newDates.push(newDate);
    });
  return newDates;
}

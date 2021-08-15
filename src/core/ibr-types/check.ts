import { DataRsep } from '@ibr-types/types.api';

export function validator(data: any): boolean {
  if (Array.isArray(data) && data.every((d) => d.id && d.order)) return true;
  else return false;
}

export function calcSort(data: DataRsep[] | null | undefined): string[] {
  if (data && validator(data)) {
    if (data.length > 1) data.sort((a, b) => a.order - b.order);
    return data.map((d) => d.id);
  }
  return [];
}

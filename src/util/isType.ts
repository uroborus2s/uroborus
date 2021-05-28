import { IdMode } from '@/util';

export function isIdType(obj: any): obj is IdMode {
  return obj && typeof obj == 'object' && typeof obj.id === 'string';
}

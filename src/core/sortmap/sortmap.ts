export type SortKeyType<K> = { id: K };

export interface SortMapOption<K, V extends SortKeyType<K>, R = string> {
  mapData?: Map<K, V>;
  sort?: Map<R, K[]>;
  arrayData?: Map<R, V[]>;
}

export class SortMap<K, V extends SortKeyType<K>, R = string> {
  private datas: Map<K, V>;
  private sorts: Map<R, K[]>;

  constructor(option?: SortMapOption<K, V, R>) {
    if (option) {
      const { mapData, sort, arrayData } = option;
      if (verifyMap(mapData) && verifyMap(sort)) {
        this.datas = new Map([...mapData!]);
        this.sorts = new Map([...sort!]);
        return;
      } else {
        if (verifyMap(arrayData)) {
          this.datas = new Map();
          this.sorts = new Map();
          for (const [key, values] of arrayData!) {
            const s: K[] = [];
            values.forEach((value) => {
              this.datas.set(value.id, value);
              s.push(value.id);
            });
            this.sorts.set(key, s);
          }
          return;
        }
      }
    }
    this.datas = new Map();
    this.sorts = new Map();
  }

  getSortResultOfKey(key: R): V[] {
    const sort = this.sorts.get(key);
    if (sort) {
      const res: V[] = [];
      sort.forEach((dKey) => {
        const r = this.datas.get(dKey);
        if (r) res.push(r);
      });
      return res;
    } else {
      return [];
    }
  }

  getSingleResult(id: K): V | undefined {
    return this.datas.get(id);
  }
}

function verifyMap<K, V>(mapValue: Map<K, V> | undefined) {
  if (mapValue && mapValue instanceof Map && mapValue.size !== 0) return true;
  else return false;
}

function verifySortKey<K, V extends SortKeyType<K>, R = string>(
  vauleMap: Map<K, V>,
  sortMap: Map<R, K[]>,
) {
  for (const sort of sortMap.values()) {
    for (const key of sort) if (!vauleMap.has(key)) return false;
  }
  return true;
}

const _storage: {
  [key: string]: { readonly store: Storage; readonly default: any };
} = {
  lastTableIdUsedByApplicationId: {
    store: window.sessionStorage,
    default: new Map<string, string>(),
  },
};

export function getStorageValue<T>(key: string): T | null {
  const store = _storage[key];
  if (store) {
    const value = store.store.getItem(key);
    let obj;

    if (value) {
      const jsonObj = JSON.parse(value);
      if (typeof jsonObj == 'object' && store.default instanceof Map) {
        const mapObj = new Map();
        Object.keys(jsonObj).forEach((key) => {
          mapObj.set(key, jsonObj[key]);
        });
        obj = mapObj;
      } else obj = jsonObj;
    } else obj = store.default;

    return obj;
  } else return null;
}

export function setStorageState<T>(
  key: string,
  valOrUpdater: ((currVal: T) => T) | T,
) {
  let val: T;
  if (typeof valOrUpdater === 'function') {
    // @ts-ignore
    val = valOrUpdater();
  } else val = valOrUpdater;
  let value: string;
  if (val instanceof Map) {
    const obj = Object.create(null);
    for (const [key, value] of val) obj[key] = value;
    value = JSON.stringify(obj);
  } else value = JSON.stringify(val);
  const store = _storage[key];
  if (store) store.store.setItem(key, value);
}

export function clearStorageState<T>(key: string) {
  const store = _storage[key];
  if (store) store.store.removeItem(key);
}

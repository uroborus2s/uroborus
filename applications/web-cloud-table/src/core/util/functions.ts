const doOnceFlags: { [key: string]: boolean } = {};

export function doOnce(func: () => void, key: string) {
  if (doOnceFlags[key]) {
    return;
  }

  func();
  doOnceFlags[key] = true;
}

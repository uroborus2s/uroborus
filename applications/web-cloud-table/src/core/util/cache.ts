declare type Timer = ReturnType<typeof setTimeout>;
export declare type CachedKeyType = string | number;
export declare type CachedData = {
  data: any;
  timer: Timer | undefined;
  startTime: number;
};

const cache = new Map<CachedKeyType, CachedData>();

const setCache = (key: CachedKeyType, cacheTime: number, data: any) => {
  const currentCache = cache.get(key);
  if (currentCache && currentCache.timer) {
    clearTimeout(currentCache.timer);
  }

  let timer = undefined;

  if (cacheTime > -1) {
    // 数据在不活跃 cacheTime 后，删除掉
    timer = setTimeout(function () {
      cache.delete(key);
    }, cacheTime);
  }

  cache.set(key, {
    data: data,
    timer: timer,
    startTime: new Date().getTime(),
  });
};

const getCache = (
  key: CachedKeyType,
): {
  data: any;
  startTime: number | undefined;
} => {
  const currentCache = cache.get(key);
  return {
    data: currentCache ? currentCache.data : undefined,
    startTime: currentCache ? currentCache.startTime : undefined,
  };
};
export { setCache, getCache };

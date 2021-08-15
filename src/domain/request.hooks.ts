import { useEffect, useState } from 'react';
import {
  PromiseService,
  PromiseResponse,
  UIService,
  AbortPromiseService,
} from '@/core/ibr-types';
import { useRecoilCallback } from 'recoil';

export function useRunPromiseService<P extends any[], R extends any>(
  promiseService: PromiseService<P, R>,
  isUnMounting: boolean,
): UIService<P> {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const uiService: UIService<P> = useRecoilCallback(() => (...prop) => {
    if (!loading) {
      setloading(true);
      promiseService(...prop)
        .catch((err) => {
          if (!isUnMounting) setError(err);
        })
        .finally(() => {
          if (!isUnMounting) setloading(false);
        });
    }
  });

  uiService.loading = loading;
  uiService.error = error;

  return uiService;
}

export function useInitPromiseService<P extends any[], R extends any>(
  promiseService: AbortPromiseService<P, R>,
  clear: () => Promise<void>,
  ...props: P
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    let isUnmounted = false;
    promiseService(abortController.signal, ...props)
      .then(() => {
        if (!isUnmounted) setLoading(false);
      })
      .catch((error) => {
        console.log(`请求发生错误，错误信息：${error}`);
        if (!isUnmounted) setError(error);
      });

    return () => {
      console.time('清理workspace localStorage');
      isUnmounted = true;
      abortController.abort();
      clear().then(() => {
        console.timeEnd('清理workspace localStorage');
      });
    };
  }, []);

  const service: PromiseResponse = {
    loading: loading,
    error: error,
  };

  return service;
}

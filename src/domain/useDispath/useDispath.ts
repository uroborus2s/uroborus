import { useRefFun } from '@/core/hooks';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useRecoilTransaction_UNSTABLE } from 'recoil';
import { recoilReducer } from '../store';
import {
  CommandOptions,
  CommandRunOptions,
  DispathOptions,
  DispathResult,
  FetchResult,
} from '../types';
import { Fetch } from './fetch';

function useDispath<R extends CommandOptions>(
  commandType: string,
  options?: DispathOptions<R>,
): DispathResult<R> {
  const _options = options || {};
  const {
    refreshDeps = [],
    //默认 false。 即在初始化时自动执行 service。
    //如果设置为 true，则需要手动调用 run 触发执行。
    manual = false,
    formatResult,
    onSuccess,
    onError,
    //设置显示 loading 的延迟时间，避免闪烁
    loadingDelay,
    //轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 run
    pollingInterval = 0,
    //在页面隐藏时，是否继续轮询。默认为 true，即不会停止轮询
    //如果设置为 false , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询
    pollingWhenHidden = true,
    //在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求。
    //如果设置为 true，在屏幕重新聚焦或重新显示时，会重新发起请求。
    refreshOnWindowFocus = false,
    //屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求
    //需要配和 refreshOnWindowFocus 使用。默认值5000
    focusTimespan = 5000,
    //防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。
    debounceInterval,
    //节流间隔, 单位为毫秒，设置后，请求进入节流模式。
    throttleInterval,
    // 默认的 data
    initialData,
    request,
    dispatch,
  } = _options;

  const [fetchResult, setFetchResult] = useState<FetchResult<R>>();

  const subscribe = useRefFun((data: FetchResult<R>) => {
    setFetchResult((p) => {
      const s = p || {};
      return { ...s, ...data };
    });
  });

  const onSuccessPersist = useRefFun(onSuccess);
  const onErrorPersist = useRefFun(onError);
  const formatResultPersist = useRefFun(formatResult);

  const reducer = useRecoilTransaction_UNSTABLE(
    (transactionInterface) => (action: CommandOptions) => {
      if (recoilReducer)
        recoilReducer(transactionInterface, { ...action, dispatch });
    },
  );

  const fetchConfig = {
    onSuccess: onSuccessPersist,
    onError: onErrorPersist,
    loadingDelay: loadingDelay,
    pollingInterval: pollingInterval,
    pollingWhenHidden: pollingWhenHidden,
    // refreshOnWindowFocus should not work on manual mode
    refreshOnWindowFocus: !manual && refreshOnWindowFocus,
    focusTimespan: focusTimespan,
    debounceInterval: debounceInterval,
    throttleInterval: throttleInterval,
    fetchResult: formatResultPersist,
  };

  const fetcheRef = useRef(fetchResult);
  fetcheRef.current = fetchResult;

  const run = useCallback(
    (config?: CommandRunOptions) => {
      let currentFetch = fetcheRef.current;

      if (!currentFetch) {
        const newFetch = new Fetch(
          commandType,
          fetchConfig,
          subscribe as (data: FetchResult<R>) => void,
          reducer,
          {
            data: initialData,
          },
        );
        currentFetch = newFetch.state;
      }
      return currentFetch.run(config);
    },
    [subscribe, commandType],
  );

  const reset = useCallback(
    function () {
      if (fetchResult) fetchResult.unmount();
      setFetchResult(undefined);
      fetcheRef.current = undefined;
    },
    [setFetchResult],
  );

  //第一次默认执行
  useLayoutEffect(() => {
    if (!manual) {
      run({ ...request });
    }
  }, []);

  useEffect(() => {
    if (!manual && fetcheRef.current) {
      fetcheRef.current.refresh();
    }
  }, [...refreshDeps]);

  // 卸载组件触发
  useEffect(
    () => () => {
      if (fetcheRef.current) fetcheRef.current.cancel();
    },
    [],
  );

  const notExecutedWarning = useCallback(function (name) {
    return function () {
      console.warn(
        "You should't call " + name + ' when service not executed once.',
      );
    };
  }, []);

  const { unmount, mutate, refresh, ...result } = fetchResult || {};

  return {
    //loading 为 true，则表明处于请求状态
    loading: !manual,
    data: initialData,
    error: undefined,
    params: {},
    cancel: notExecutedWarning('cancel'),
    ...result,
    run: run,
    reset: reset,
  };
}

export { useDispath };

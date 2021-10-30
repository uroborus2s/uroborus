import { DebouncedFunc } from 'lodash';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import limit from '@/core/util/limit';
import { isDocumentVisible, subscribeVisible } from '@/core/util';
import {
  CommandOptions,
  CommandRunOptions,
  FetchOptions,
  FetchResult,
  InitStateOptions,
  NoopFun,
} from '../types';
import axios, { CancelTokenSource } from 'axios';
import { command } from '../store';

class Fetch<R extends CommandOptions> {
  private cancelTokenSource: CancelTokenSource | undefined;
  private pollingWhenVisibleFlag: boolean;
  private pollingTimer: ReturnType<typeof setTimeout> | undefined;
  private loadingDelayTimer: ReturnType<typeof setTimeout> | undefined;
  private unsubscribe: NoopFun[];
  public state: FetchResult<R>;
  private readonly subscribe: (data: FetchResult<R>) => void;
  private config: FetchOptions<R>;
  private readonly debounceRun:
    | DebouncedFunc<(config: CommandRunOptions) => void>
    | undefined;
  private readonly throttleRun:
    | DebouncedFunc<(config: CommandRunOptions) => void>
    | undefined;
  private readonly commandType: string;
  private reducer: (resp: CommandOptions) => void;
  private errorReducer: (error: Error) => void;

  constructor(
    type: string,
    config: FetchOptions<R>,
    subscribe: (data: FetchResult<R>) => void,
    reducer: (resp: CommandOptions) => void,
    errorReducer: (error: Error) => void,
    initState?: InitStateOptions<R>,
  ) {
    this.commandType = type;
    // 请求时序
    // visible 后，是否继续轮询
    this.pollingWhenVisibleFlag = false;
    this.pollingTimer = undefined;
    this.loadingDelayTimer = undefined;
    this.unsubscribe = [];
    this.state = {
      loading: false,
      params: {},
      data: undefined,
      error: undefined,
      run: this.run.bind(this),
      unmount: this.unmount.bind(this),
      cancel: this.cancel.bind(this),
      refresh: this.refresh.bind(this),
      mutate: this.mutate.bind(this),
    };
    this.config = config;
    this.subscribe = subscribe;
    this.reducer = reducer;
    this.errorReducer = errorReducer;

    if (initState) this.state = { ...this.state, ...initState };

    this.debounceRun = this.config.debounceInterval
      ? debounce(this.#run, this.config.debounceInterval)
      : undefined;
    this.throttleRun = this.config.throttleInterval
      ? throttle(this.#run, this.config.throttleInterval)
      : undefined;
    const limitRefresh = limit(
      this.refresh.bind(this),
      this.config.focusTimespan,
    );

    //轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 run
    if (this.config.pollingInterval) {
      this.unsubscribe.push(subscribeVisible(this.rePolling.bind(this)));
    }

    //在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求。
    // 如果设置为 true，在屏幕重新聚焦或重新显示时，会重新发起请求。
    //当轮询模式时，此设置无效。
    if (this.config.refreshOnWindowFocus && !this.config.pollingInterval) {
      this.unsubscribe.push(subscribeVisible(limitRefresh));
    }
  }

  setState(s: Partial<FetchResult<R>>): void {
    const _s = s ?? {};

    this.state = { ...this.state, ..._s };
    if (this.subscribe) this.subscribe(this.state);
  }

  run(config: CommandRunOptions) {
    if (this.debounceRun) {
      this.debounceRun.call(this, config);
      return Promise.resolve(null);
    }

    if (this.throttleRun) {
      this.throttleRun.call(this, config);
      return Promise.resolve(null);
    }

    return this.#run.call(this, config);
  }

  #run = (config: CommandRunOptions) => {
    // 取消已有定时器
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer);
    }
    // 取消 loadingDelayTimer
    if (this.loadingDelayTimer) {
      clearTimeout(this.loadingDelayTimer);
    }

    if (this.cancelTokenSource) this.cancelTokenSource?.cancel();
    const currentCancelSource = axios.CancelToken.source();
    this.cancelTokenSource = currentCancelSource;

    this.setState({
      params: config,
    });

    if (this.config.loadingDelay) {
      this.loadingDelayTimer = setTimeout(() => {
        this.setState({
          loading: true,
        });
      }, this.config.loadingDelay);
    } else {
      this.setState({
        loading: true,
      });
    }

    return command()
      .then((s) => {
        return s(currentCancelSource.token)({
          request: { ...config },
          name: this.commandType,
        });
      })
      .then((res) => {
        if (currentCancelSource.token) {
          currentCancelSource.token.throwIfRequested();
        }
        const formattedResult = this.config.formatResult
          ? this.config.formatResult(res)
          : res;

        if (this.loadingDelayTimer) clearTimeout(this.loadingDelayTimer);

        if (this.config.onSuccess) {
          this.config.onSuccess(formattedResult as R, { ...config });
        }

        this.reducer(formattedResult);

        this.setState({
          data: formattedResult as R,
          error: undefined,
          loading: false,
        });

        return formattedResult;
      })
      .catch((reson) => {
        console.log('错误', reson);

        if (axios.isCancel(reson)) {
          return Promise.reject(reson);
        }
        if (this.loadingDelayTimer) {
          clearTimeout(this.loadingDelayTimer);
        }

        if (this.config.onError) {
          this.config.onError(reson, config);
        }

        this.setState({
          data: undefined,
          error: reson,
          loading: false,
        });

        this.errorReducer(reson);

        console.error(reson); // eslint-disable-next-line prefer-promise-reject-errors

        return Promise.reject(
          'useDispath捕获到异常，如果需要自己处理异常，可以将options.throwOnError设置为true。',
        );
      })
      .finally(() => {
        if (!currentCancelSource.token.reason) {
          if (this.config.pollingInterval) {
            // 如果屏幕隐藏，并且 !pollingWhenHidden, 则停止轮询，并记录 flag，等 visible 时，继续轮询
            if (!isDocumentVisible() && !this.config.pollingWhenHidden) {
              this.pollingWhenVisibleFlag = true;
              return;
            }

            //轮询模式
            this.pollingTimer = setTimeout(() => {
              this.#run.call(this, config).then(() => {
                if (process.env.NODE_ENV !== 'production') {
                  console.log('轮询模式！');
                }
              });
            }, this.config.pollingInterval);
          }
        }
      });
  };

  cancel() {
    if (this.debounceRun) {
      this.debounceRun.cancel();
    }

    if (this.throttleRun) {
      this.throttleRun.cancel();
    }

    if (this.loadingDelayTimer) {
      clearTimeout(this.loadingDelayTimer);
    }

    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer);
    }

    this.pollingWhenVisibleFlag = false;
    if (this.cancelTokenSource)
      this.cancelTokenSource.cancel(
        `取消当前的Promise,当前请求类型：${this.commandType},参数:${this.state.params}`,
      );
    this.setState({
      loading: false,
    });
  }

  refresh() {
    this.run(this.state.params);
  }

  rePolling() {
    if (this.pollingWhenVisibleFlag) {
      this.pollingWhenVisibleFlag = false;
      this.refresh();
    }
  }

  mutate(data: R | undefined | ((data: R) => R)) {
    if (typeof data === 'function') {
      this.setState({
        data: this.state.data && data(this.state.data),
      });
    } else {
      this.setState({
        data: data,
      });
    }
  }

  unmount() {
    console.log('执行unmount');

    this.cancel();
    this.unsubscribe.forEach(function (s) {
      s();
    });
  }
}

export { Fetch };

import { Component, createRef, PropsWithChildren, Ref } from 'react';

import { bindEvents } from '@uroborus/core';

import type { ErrorBoundaryProps } from './interface/DndContextProps.js';
import { RecoilRoot } from 'recoil';
import DndApp from './DndApp.js';
import { AppCallbacks } from './interface/DndContextProps.js';

export default class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>
> {
  private unbind;

  private callBackRef;

  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.unbind = () => {};
    this.callBackRef = createRef();
  }

  componentDidMount() {
    this.unbind = bindEvents(window, [
      {
        eventName: 'error',
        fn: this.onWindowError,
      },
    ]);
  }

  componentDidCatch(err: Error) {
    if ('message' in err) {
      if (process.env.NODE_ENV !== 'production') {
        const { logger } = this.props;
        logger.error(err.message);
      }

      this.setState({});
    }
  }

  componentWillUnmount() {
    this.unbind();
  }

  onWindowError = (event: ErrorEvent) => {
    const callbacks = this.getCallbacks();

    if (callbacks.isDragging()) {
      callbacks.tryAbort();
      const { logger } = this.props;

      logger.warn(`
        An error was caught by our window 'error' event listener while a drag was occurring.
        The active drag has been aborted.
      `);
    }

    const err = event.error;

    if ('message' in err) {
      // Marking the event as dealt with.
      // This will prevent any 'uncaught' error warnings in the console
      event.preventDefault();
      const { logger } = this.props;
      logger.error(err.message);
    }
  };

  getCallbacks = () => {
    const { callBacksRef } = this.props;
    if (callBacksRef && callBacksRef.current) {
      return callBacksRef.current;
    }
    throw new Error('Unable to find AppCallbacks in <ErrorBoundary/>');
  };

  render() {
    const { children } = this.props;
    return (
      <RecoilRoot>
        <DndApp ref={errRef as Ref<AppCallbacks>} {...props}>
          {children}
        </DndApp>
      </RecoilRoot>
    );
  }
}

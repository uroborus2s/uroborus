import type { FC, PropsWithChildren, Ref } from 'react';
import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Logurs } from '@uroborus/core';
import { MutableSnapshot, RecoilRoot } from 'recoil';

import DndApp from './DndApp.js';
import { globalAppState } from './GlobalState.js';
import type {
  AppCallbacks,
  DndContextProps,
} from './interface/DndContextProps.js';

let singleton = false;

const DndContext: FC<PropsWithChildren<DndContextProps>> = ({
  children,
  ...props
}) => {
  const errRef = useRef<AppCallbacks>();
  const logger = new Logurs({ name: 'uroborus-react-dnd' });
  const isFirstInstant = useRef(false);
  useEffect(() => {
    return () => {
      if (isFirstInstant.current) singleton = false;
    };
  }, []);

  if (singleton && !isFirstInstant.current)
    return children === undefined ? null : (children as ReactElement);

  isFirstInstant.current = true;
  singleton = true;

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre style={{ color: 'red' }}>{error.message}</pre>
        </div>
      )}
      onError={}
    >
      <RecoilRoot>
        <DndApp ref={errRef as Ref<AppCallbacks>} {...props}>
          {children}
        </DndApp>
      </RecoilRoot>
    </ErrorBoundary>
  );
};

export default DndContext;

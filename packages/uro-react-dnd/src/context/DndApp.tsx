import type { ForwardRefRenderFunction, PropsWithChildren } from 'react';
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  version,
} from 'react';

import { checkDoctype, checkReactVersion } from '@uroborus/core';
import { useDevelopment } from '@uroborus/hooks';
import { useRecoilCallback, useRecoilStoreID } from 'recoil';

import { peerDependencies } from '../../package.json';
import { DndAppContext } from '../core/DndAppContext.js';
import { DraggableId } from '../core/index.js';
import { reducers } from '../reducer/reducer.js';

import { AppContext } from './AppContext.js';
import { globalAppState } from './GlobalState.js';
import type {
  AppCallbacks,
  DndContextProps,
} from './interface/DndContextProps.js';
import { Action } from './interface/IAction.js';
import { IState, StatePhase } from './interface/IState.js';
import useSensorMarshal from './useSensorMarshal.js';

const DndApp: ForwardRefRenderFunction<
  AppCallbacks,
  PropsWithChildren<DndContextProps>
> = ({ children, enableDefaultSensors, sensors, logLevel }, ref) => {
  const contextId = useRecoilStoreID();

  const reducer = useRecoilCallback(
    ({ snapshot, set }) =>
      (action: Action) => {
        const state = snapshot.getLoadable(globalAppState).contents;
        const setState = (
          valOrUpdater: IState | ((state: IState) => IState),
        ) => {
          set(globalAppState, valOrUpdater);
        };
        return reducers[action.type]({ setState, state, action });
      },
    [],
  );

  const tryAbort = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const state = snapshot.getLoadable(globalAppState).contents;
        if (state.phase !== 'IDLE') {
          set(globalAppState, { phase: StatePhase.IDLE, shouldFlush: true });
        }
      },
    [],
  );

  const isDragging = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        const state = snapshot.getLoadable(globalAppState).contents;
        return state.isDragging || state.phase === 'DROP_ANIMATING';
      },
    [],
  );

  const appContext = useMemo(
    () =>
      new DndAppContext({
        contextId: String(contextId),
        reducer,
        logLevel,
      }),
    [logLevel],
  );

  useDevelopment(() => {
    checkDoctype(document, appContext.logger);
    checkReactVersion(peerDependencies.react, version, appContext.logger);
  }, []);

  // Clean store when unmounting
  useEffect(() => {
    return tryAbort;
  }, [tryAbort]);

  useImperativeHandle(ref, () => ({ tryAbort, isDragging }), [
    tryAbort,
    isDragging,
  ]);

  useSensorMarshal({
    enableDefaultSensors: enableDefaultSensors !== false,
    customSensors: sensors,
    contextId: String(contextId),
    appContext,
  });

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default memo(forwardRef(DndApp));

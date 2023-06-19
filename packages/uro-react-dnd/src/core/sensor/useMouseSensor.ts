import { useCallback, useMemo, useRef } from 'react';

import type { WINDOWEventBinding } from '@uroborus/core';
import { bindEvents, invariant, noop } from '@uroborus/core';
import { useLayoutEffect } from '@uroborus/hooks';
import { Position } from 'css-box-model';

import findDraggableIdFromEvent from '../element/findDraggableIdFromEvent.js';
import type { SensorAPI } from '../interface/IDragStart.js';
import type { Phase } from '../interface/ISeneor.js';
import { MemoryPhaseType } from '../interface/ISeneor.js';

const idle: Phase = { type: MemoryPhaseType.IDLE };

const primaryButton = 0;

const getDragBindings = ({ cancel }: { cancel: () => void }) =>
  [
    {
      eventName: 'mousemove',
      fn: (event: MouseEvent) => {
        const { button, clientX, clientY } = event;
        if (button !== primaryButton) {
          return;
        }
        const point: Position = {
          x: clientX,
          y: clientY,
        };
      },
    },
  ] as WINDOWEventBinding<keyof WindowEventMap>[];

export default (api: SensorAPI) => {
  const phaseRef = useRef<Phase>(idle);
  const unbindEventsRef = useRef<() => void>(noop);

  const startCapture = useCallback(
    (event: MouseEvent) => {
      // Event already used
      if (event.defaultPrevented) {
        return;
      }
      // only starting a drag if dragging with the primary mouse button
      if (event.button !== primaryButton) {
        return;
      }

      // Do not start a drag if any modifier key is pressed
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      const draggableId = findDraggableIdFromEvent(
        api.contextId,
        event,
        api.appContext.logger,
      );

      if (!draggableId) {
        return;
      }

      const actions = api.tryGetLock(
        draggableId,
        // stop is defined later
        // eslint-disable-next-line no-use-before-define
        stop,
        { sourceEvent: event },
      );

      if (!actions) {
        return;
      }

      // consuming the event
      event.preventDefault();

      const point: Position = {
        x: event.clientX,
        y: event.clientY,
      };

      // unbind this listener
      unbindEventsRef.current();
      // using this function before it is defined as their is a circular usage pattern
      invariant(
        phaseRef.current.type === MemoryPhaseType.IDLE,
        'Expected to move from IDLE to PENDING drag',
      );
      phaseRef.current = {
        type: MemoryPhaseType.PENDING,
        point,
        actions,
      };
    },
    [api],
  );

  const preventForcePress = useMemo(() => {}, []);

  const listenForCapture = useCallback(
    (stop: () => void) => {
      unbindEventsRef.current = bindEvents(
        window,
        [{ eventName: 'mousedown', fn: startCapture }],
        {
          passive: false,
          capture: true,
        },
      );
    },
    [startCapture],
  );

  const stop = useCallback(() => {
    const {
      current: { type, actions },
    } = phaseRef;
    if (type === MemoryPhaseType.IDLE) {
      return;
    }
    if (type === MemoryPhaseType.DRAGGING)
      actions.cancel({ shouldBlockNextClick: true });
    else if (type === MemoryPhaseType.PENDING) actions.abort();
    phaseRef.current = idle;
    unbindEventsRef.current();

    listenForCapture(stop);
  }, []);

  useLayoutEffect(() => {
    listenForCapture(stop);
    return () => unbindEventsRef.current();
  }, [listenForCapture]);
};

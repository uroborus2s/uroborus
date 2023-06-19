import type {
  WINDOWEventBinding,
  HTMLEventBinding,
  BindEventOptions,
} from './event.types.js';

export function bindEvents<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  bindings: HTMLEventBinding<K>[],
  sharedOptions?: BindEventOptions,
): () => void;
export function bindEvents<K extends keyof WindowEventMap>(
  el: Window & typeof globalThis,
  bindings: WINDOWEventBinding<K>[],
  sharedOptions?: BindEventOptions,
): () => void;
export function bindEvents(
  el: any,
  bindings: any[],
  sharedOptions?: BindEventOptions,
) {
  const unBindings = bindings.map((binding) => {
    const options = { ...sharedOptions, ...binding.options };

    el.addEventListener(binding.eventName, binding.fn, options);

    return () => {
      el.removeEventListener(binding.eventName, binding.fn, options);
    };
  });

  // Return a function to unbind events
  return () => {
    unBindings.forEach((unbind) => {
      unbind();
    });
  };
}

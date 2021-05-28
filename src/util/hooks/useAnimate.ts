function easeInOutSin(time: number) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

export default function UseAnimate(
  property: 'scrollTop' | 'scrollLeft',
  element: HTMLDivElement,
  to: number,
) {
  const duration = 300;
  let start: number | undefined;
  const from = element[property];

  let cancelled = false;

  const cancel = function cancel() {
    cancelled = true;
  };

  const step = function step(timestamp: number) {
    if (cancelled) {
      return;
    }

    if (!start) {
      start = timestamp;
    }

    const time = Math.min(1, (timestamp - start!) / duration);
    element[property] = easeInOutSin(time) * (to - from) + from;

    if (time >= 1) {
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    return cancel;
  }
  requestAnimationFrame(step);
  return cancel;
}

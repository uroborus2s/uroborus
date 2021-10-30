export default function (fn: any, timespan?: number): (...args: any[]) => void {
  let pending = false;

  return (...args: any[]) => {
    if (pending) return;
    pending = true;
    fn(...args);
    setTimeout(function () {
      pending = false;
    }, timespan);
  };
}

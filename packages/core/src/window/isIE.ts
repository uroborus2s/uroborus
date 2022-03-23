export default function () {
  return (
    typeof window !== 'undefined' &&
    typeof window.navigator !== 'undefined' &&
    /Trident\/|MSIE /.test(window.navigator.userAgent)
  );
}

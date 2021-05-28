let warned: { [key: string]: boolean } = {};

function warning(valid: boolean, message: string) {
  // Support uglify
  if (
    process.env.NODE_ENV !== 'production' &&
    !valid &&
    console !== undefined
  ) {
    console.error('Warning: '.concat(message));
  }
}

function call(method: (...arg: any[]) => any, valid: boolean, message: string) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}

export default function warningOnce(valid: boolean, message: string) {
  call(warning, valid, message);
}

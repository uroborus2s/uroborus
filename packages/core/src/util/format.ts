export function format(org?: any, ...param: any[]): string {
  let found = 0;
  let res = org ? String(org) : '';
  if (param && param.length > 0) {
    while (found < param.length && /\$\{variable\}/.test(res)) {
      res = res.replace(
        /\$\{variable\}/i,
        typeof param[found] === 'string' ? param[found] : String(param[found]),
      );
      found += 1;
    }
  }
  const restParam = param.slice(found);
  restParam.unshift(res);
  res = restParam.join(' ');
  return res;
}

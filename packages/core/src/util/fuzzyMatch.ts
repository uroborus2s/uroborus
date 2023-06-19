/**
 * Algorithm to do fuzzy search
 * @param {string} from
 * @return {[]}
 */
export function getBigrams(from: string) {
  const s = from.toLowerCase();
  const v = new Array(s.length - 1);
  let i;
  let j;
  let ref;

  for (i = 0, j = 0, ref = v.length; j <= ref; i += 1, i += 1) {
    v[i] = s.slice(i, i + 2);
  }

  return v;
}

/**
 * 比较两个相似程度
 * @param str1
 * @param str2
 */
export function stringDistances(str1: string, str2: string): number {
  if (str1.length === 0 && str2.length === 0) {
    return 0;
  }

  const pairs1 = getBigrams(str1);
  const pairs2 = getBigrams(str2);
  const union = pairs1.length + pairs2.length;
  let hitCount = 0;
  let j;
  let len;

  for (j = 0, len = pairs1.length; j < len; j += 1) {
    const x = pairs1[j];
    let k;
    let len1;

    for (k = 0, len1 = pairs2.length; k < len1; k += 1) {
      const y = pairs2[k];
      if (x === y) {
        hitCount += 1;
      }
    }
  }

  return hitCount > 0 ? (2 * hitCount) / union : 0;
}

export function stringWeightedDistances(str1: string, str2: string): number {
  const a = str1.replace(/\s/g, '');
  const b = str2.replace(/\s/g, '');

  let weight = 0;
  let lastIndex = 0;

  for (let i = 0; i < a.length; i += 1) {
    const idx = b.indexOf(a[i], lastIndex);
    if (idx !== -1) {
      lastIndex = idx;
      weight += 100 - ((lastIndex * 100) / 10000) * 100;
    }
  }
  return weight;
}

/**
 *
 * @param {String} inputValue 要与字符串列表进行比较的值
 * @param allSuggestions 要比较的字符串列表
 * @param hideIrrelevant 默认情况下，模糊建议只会对 allSuggestions 列表进行排序， 将其设置为 true 以过滤掉不相关的值
 * @param weighted 将此设置为 true，以使按键入顺序匹配的字母在结果中具有优先权。
 */
export function fuzzySuggestions(
  inputValue: string,
  allSuggestions: string[],
  hideIrrelevant?: boolean,
  weighted?: boolean,
): string[] {
  const search = weighted ? stringWeightedDistances : stringDistances;
  let thisSuggestions: { value: string; relevance: number }[] =
    allSuggestions.map((text) => ({
      value: text,
      relevance: search(inputValue.toLowerCase(), text.toLocaleLowerCase()),
    }));

  thisSuggestions.sort((a, b) => b.relevance - a.relevance);

  if (hideIrrelevant) {
    thisSuggestions = thisSuggestions.filter(
      (suggestion) => suggestion.relevance !== 0,
    );
  }

  return thisSuggestions.map((suggestion) => suggestion.value);
}

/**
 * 将 inputValues 转换为对象，对象属性名为inputValues 去除和validValues重合的值
 *
 * @param inputValues 要过滤的属性名数组，当属性名和validValues中属性名重合时，从inputValues中删除
 * @param validValues 要校验的属性名
 * @param allSuggestions 所有当字段
 */
export function fuzzyCheckStrings(
  inputValues: string[],
  validValues: string[],
  allSuggestions: string[],
): { [p: string]: string[] } {
  const fuzzyMatches: { [p: string]: string[] } = {};
  const invalidInputs: string[] = inputValues.filter(
    (inputValue) =>
      !validValues.some((validValue) => validValue === inputValue),
  );

  if (invalidInputs.length > 0) {
    invalidInputs.forEach((invalidInput) => {
      fuzzyMatches[invalidInput] = fuzzySuggestions(
        invalidInput,
        allSuggestions,
      );
    });
  }

  return fuzzyMatches;
}

import { FilterOptionsState } from '@mui/material/useAutocomplete';
import PinyinMatch from 'pinyin-match';

export default function <T>(
  options: T[],
  { inputValue, getOptionLabel }: FilterOptionsState<T>,
) {
  if (inputValue)
    return options.filter((option) => {
      const candidate = getOptionLabel(option);
      return !!PinyinMatch.match(candidate, inputValue);
    });
  return [...options];
}

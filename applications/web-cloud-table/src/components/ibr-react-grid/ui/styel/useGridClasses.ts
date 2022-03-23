import classNames from 'classnames';
import useGridStyles from './useGridStyles';
import { useContext } from 'react';
import { GridClasses } from '../context';

const useGridClassesBySlots = (slots: Record<string, string[]>) => {
  const classes = useContext(GridClasses);

  const res: Record<string, string> = {};

  Object.keys(slots).forEach((slot) => {
    res[slot] = classNames([
      ...new Set(
        (slots[slot] as string[]).reduce((cls, key) => {
          if (key && classes && classes[key]) {
            cls.push(classes[key]);
          }
          return cls;
        }, [] as string[]),
      ),
    ]);
  });

  return res;
};

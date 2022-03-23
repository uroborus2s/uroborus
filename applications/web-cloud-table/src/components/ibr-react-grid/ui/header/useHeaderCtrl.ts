import { useEffect, useLayoutEffect } from 'react';

export const useHeaderCtrl = () => {
  const setHeaderHeight = () => {};

  useEffect(() => {
    if (process.env.NODE_ENV == 'development') {
    }
  }, []);

  useLayoutEffect(() => {
    setHeaderHeight();
  }, []);
};

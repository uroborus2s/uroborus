import { type Context, useContext } from 'react';

import { invariant } from '@uroborus/core';

export default <T>(context: Context<T>): T => {
  const result = useContext(context);
  invariant(result, 'Could not find required context');
  return result!;
};

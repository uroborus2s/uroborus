import { Ref, useImperativeHandle, useState } from 'react';
import { BaseColors } from '@/util';
import { FontColorRefHandler } from '@ibr/ibr-tab';

export default function (ref: Ref<FontColorRefHandler>) {
  const [color, setColor] = useState(BaseColors.gary5);

  useImperativeHandle(ref, () => ({
    changeIconColor: (color: string) => {
      setColor(color);
    },
  }));

  return color;
}

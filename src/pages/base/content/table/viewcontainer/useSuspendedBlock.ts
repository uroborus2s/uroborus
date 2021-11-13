import { useRafState } from '@/core/hooks';
import { MouseEvent, useState } from 'react';

export default function () {
  const [show, setShow] = useState(false);

  const [rect, setRect] = useRafState(200);

  //鼠标进入元素时执行
  const handleMouseEnter = () => {
    setShow(true);
  };

  //鼠标离开元素时执行
  const handleMouseLeave = () => {
    setShow(false);
  };

  //鼠标在元素上移动时执行
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const top = event.currentTarget.getBoundingClientRect().top;
    setRect(event.pageY - top);
  };

  return { show, rect, handleMouseEnter, handleMouseLeave, handleMouseMove };
}

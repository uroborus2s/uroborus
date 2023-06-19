import { subtract } from './position.js';

export default ({
  scrollHeight,
  scrollWidth,
  height,
  width,
}: {
  scrollHeight: number;
  scrollWidth: number;
  height: number;
  width: number;
}) => {
  const maxScroll = subtract(
    // full size
    { x: scrollWidth, y: scrollHeight },
    // viewport size
    { x: width, y: height },
  );

  return {
    x: Math.max(0, maxScroll.x),
    y: Math.max(0, maxScroll.y),
  };
};

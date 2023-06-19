/**
 * evolution a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
import { decomposeColor, recomposeColor } from '@mui/system';

function clamp(value: number, min = 0, max = 1) {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(
        `The value provided ${value} is out of range [${min}, ${max}].`,
      );
    }
  }
  return Math.min(Math.max(min, value), max);
}

export const evolutionColor = (color: string, coefficient: number) => {
  const colorObject = decomposeColor(color);
  const cof = clamp(coefficient);

  if (colorObject.type.indexOf('hsl') !== -1) {
    colorObject.values[2] /= cof;
  } else if (
    colorObject.type.indexOf('rgb') !== -1 ||
    colorObject.type.indexOf('color') !== -1
  ) {
    for (let i = 0; i < 3; i += 1) {
      colorObject.values[i] /= cof;
    }
  }

  return recomposeColor(colorObject);
};

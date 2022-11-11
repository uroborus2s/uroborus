import { Point } from '~/classes/Point';

export const textParticles: Point[][] = [];

export const fillTextPoints = () => {
  ['刘逸云', '爱你', '永远'].forEach((text) => {
    textParticles.push(getTextPoint(text, 0, 0));
  });
};

export function getTextPoint(text: string, x: number, y: number) {
  const textCanvas = document.createElement('canvas');
  textCanvas.width = 800;
  textCanvas.height = 200;
  const textctx = textCanvas.getContext('2d');
  const points: Point[] = [];
  if (textctx) {
    textctx.fillStyle = '#000000';
    textctx.fillRect(0, 0, textCanvas.width, textCanvas.height);
    const gap = 6;
    const fontSize = 120;
    textctx!.font = fontSize + 'px Verdana';
    textctx!.fillStyle = '#ffffff';

    const textWidth = textctx.measureText(text).width;
    const textHeight = fontSize;

    textctx!.fillText(text, 0, textHeight);
    const imgData = textctx!.getImageData(0, 0, textWidth, textHeight * 1.2);

    textctx!.fillStyle = '#000000';
    textctx!.fillRect(0, 0, textCanvas.width, textCanvas.height);

    for (let h = 0; h < textHeight * 1.2; h += gap) {
      for (let w = 0; w < textWidth; w += gap) {
        const position = (textWidth * h + w) * 4;
        const r = imgData.data[position],
          g = imgData.data[position + 1],
          b = imgData.data[position + 2],
          a = imgData.data[position + 3];

        if (r + g + b == 0) continue;

        const fx = x + w - textWidth / 2;
        const fy = y + h - textHeight / 2;

        points.push(new Point(fx, fy));
        // points.push(fx, fy, z);
      }
    }
  }
  return points;
}

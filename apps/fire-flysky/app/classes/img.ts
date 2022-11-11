import { settings } from '~/classes/constant';

export const textImg = function (txt: string, document: Document) {
  const canvas = document.createElement('canvas');
  // const canvas = document.getElementsByClassName(
  //     'load-canvas',
  //   )[0] as HTMLCanvasElement,
  const context = canvas.getContext('2d');
  canvas.width = settings.particles.size;
  canvas.height = settings.particles.size;
  const image = new Image();

  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width >> 1, canvas.height >> 1);
    context.font = '20px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#ea80b0';
    context.fillText(txt, 0, 0);
    image.src = canvas.toDataURL();
  }
  return image;
};

export const createImg = () => {};

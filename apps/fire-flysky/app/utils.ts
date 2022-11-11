import { Point, settings } from "~/classes";

const DEFAULT_REDIRECT = '/';

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect;
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect;
  }

  return to;
}

const particles: any[] = [];

export function createFireworks(
  mainCanvas: HTMLCanvasElement,
  textCanvas: HTMLCanvasElement,
  x: number,
  y: number,
  text = '',
) {
  const hue = Math.random() * 360;
  const hueVariance = 30;

  function setupColors(p: any) {
    p.hue =
      Math.floor(Math.random() * (hue + hueVariance - (hue - hueVariance))) +
      (hue - hueVariance);
    p.brightness = Math.floor(Math.random() * 21) + 50;
    p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
  }

  if (text != '') {
    const gap = 8;
    const fontSize = 120;
    const textctx = textCanvas.getContext('2d');
    textctx!.font = fontSize + 'px Verdana';
    textctx!.fillStyle = '#ffffff';

    const textWidth = textctx!.measureText(text).width;
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

        const p: any = {};

        p.x = x;
        p.y = y;

        p.fx = x + w - textWidth / 2;
        p.fy = y + h - textHeight / 2;

        p.size = Math.floor(Math.random() * 2) + 1;
        p.speed = 1;

        setupColors(p);

        particles.push(p);
      }
    }
  } else {
    const count = 100;
    for (let i = 0; i < count; i++) {
      //角度
      const angle = (360 / count) * i;
      //弧度
      const radians = (angle * Math.PI) / 180;

      const p: any = {};

      p.x = x;
      p.y = y;
      p.radians = radians;

      //大小
      p.size = Math.random() * 2 + 1;

      //速度
      p.speed = Math.random() * 5 + 0.4;

      //半径
      p.radius = Math.random() * 81 + 50;

      p.fx = x + Math.cos(radians) * p.radius;
      p.fy = y + Math.sin(radians) * p.radius;

      setupColors(p);

      particles.push(p);
    }
  }
}

export function drawFireworks(
  clearCanvas: () => void,
  mainCanvas: HTMLCanvasElement,
) {
  clearCanvas();
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.x += (p.fx - p.x) / 10;
    p.y += (p.fy - p.y) / 10 - (p.alpha - 1) * p.speed;

    p.radius *= 1 - p.speed / 100;

    p.alpha -= 0.005;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }
    const context = mainCanvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      context.closePath();

      context.fillStyle =
        'hsla(' + p.hue + ',100%,' + p.brightness + '%,' + p.alpha + ')';
      context.fill();
    }
  }
}

export function fire(
  mainCanvas: HTMLCanvasElement,
  textCanvas: HTMLCanvasElement,
  clearCanvas: () => void,
) {
  const tick = () => {
    const context = mainCanvas.getContext('2d');
    if (context) {
      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = 'rgba(0,0,0,' + 10 / 100 + ')';
      context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
      context.globalCompositeOperation = 'lighter';
    }
    drawFireworks(clearCanvas, mainCanvas);
    requestAnimationFrame(tick);
  };
  tick();
  const cancelId = setInterval(() => {
    createFireworks(
      mainCanvas,
      textCanvas,
      Math.random() * mainCanvas.width,
      Math.random() * mainCanvas.height,
      ['你好', '世界', '永远'][Math.floor(Math.random() * 3)],
    );
  }, 2000);

  return () => {
    clearInterval(cancelId);
  };
}

export function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}


// get point on heart with -PI <= t <= PI
export function pointOnHeart(t: number) {
  return new Point(
    160 * Math.pow(Math.sin(t), 3),
    130 * Math.cos(t) -
      50 * Math.cos(2 * t) -
      20 * Math.cos(3 * t) -
      10 * Math.cos(4 * t) +
      25,
  );
}

// creating the particle image using a dummy canvas
export const image = function (document: Document) {
  const canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');
  canvas.width = settings.particles.size;
  canvas.height = settings.particles.size;
  // helper function to create the path
  function to(t: number) {
    const point = pointOnHeart(t);
    point.x =
      settings.particles.size / 2 + (point.x * settings.particles.size) / 350;
    point.y =
      settings.particles.size / 2 - (point.y * settings.particles.size) / 350;
    return point;
  }
  const image = new Image();
  if (context) {
    // create the path
    context.beginPath();
    let t = -Math.PI;
    let point = to(t);
    context.moveTo(point.x, point.y);
    while (t < Math.PI) {
      t += 0.01; // baby steps!
      point = to(t);
      context.lineTo(point.x, point.y);
    }
    context.closePath();
    // create the fill
    context.fillStyle = '#ea80b0';
    context.fill();
    // create the image
    image.src = canvas.toDataURL();
  }
  return image;
};

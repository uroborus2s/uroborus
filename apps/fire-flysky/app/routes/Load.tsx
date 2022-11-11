import { FC, Ref, useRef } from 'react';
import useEffectOnce from '~/useEffectOnce';
import { ParticlePool, Point, settings } from '~/classes';
import { pointOnHeart } from '~/utils';

/*
 * Putting it all together
 */
const render = function (canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d'),
    particles = new ParticlePool(settings.particles.length),
    particleRate = settings.particles.length / settings.particles.duration; // particles/sec
  let time: number;

  let frameId: number;

  // render that thing!
  function animate() {
    // next animation frame
    frameId = requestAnimationFrame(animate);

    // update time
    const newTime = new Date().getTime() / 1000,
      deltaTime = newTime - (time || newTime);
    time = newTime;

    if (context) {
      // clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // create new particles
      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().length(settings.particles.velocity) as Point;
        particles.add(
          canvas.width / 2 + pos.x,
          canvas.height / 2 - pos.y,
          dir.x,
          -dir.y,
        );
      }

      // update and draw particles
      particles.update(deltaTime);
      particles.draw(context, document);
    }
  }

  setTimeout(() => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    animate();
    // textImg('刘',document)
  }, 10);

  return () => {
    cancelAnimationFrame(frameId);
  };
};

const Load: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffectOnce(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem) {
      canvasElem.addEventListener(
        'resize',
        () => {
          canvasElem.height = canvasElem.clientHeight;
          canvasElem.width = canvasElem.clientWidth;
        },
        false,
      );
    }
  });

  useEffectOnce(() => {
    let cancel = () => {};
    if (canvasRef.current) cancel = render(canvasRef.current);
    return cancel;
  });

  return (
    <>
      <canvas
        ref={canvasRef as Ref<HTMLCanvasElement>}
        className="load-canvas"
      />
      <p className="mentions">宝宝别走开，马上就加载好了......</p>
    </>
  );
};

export default Load;

import type { Ref } from 'react';
import { useRef, useState } from 'react';
import { bgRender, onWindowResize } from '~/sky';
import useEffectOnce from '~/useEffectOnce';
import Load from '~/routes/Load';
import skybg from '../images/sky.jpg';
import { addRocket, bomRender, onBomResize } from '~/bom';
import { fillTextPoints } from '~/classes/text';
import { onStarResize, starsRender } from '~/starCount';

export default function Index() {
  const containerRef = useRef<HTMLDivElement>();
  const mainElemRef = useRef<HTMLElement>();
  const fireBomElemRef = useRef<HTMLCanvasElement>();
  const starsElemRef = useRef<HTMLCanvasElement>();

  const [loading, setLoading] = useState(true);

  const handleOnSize = useRef<(() => void) | undefined>();

  const resize = () => {
    onWindowResize();
    if (fireBomElemRef.current) onBomResize(fireBomElemRef.current);
    if (starsElemRef.current) {
      onStarResize(starsElemRef.current);
    }
  };

  useEffectOnce(() => {
    window.addEventListener('resize', resize, false);
    resize();
    return () => {
      window.removeEventListener('resize', resize, false);
    };
  });

  useEffectOnce(() => {
    if (containerRef.current) {
      bgRender({
        container: containerRef.current,
        setLoading: () => setLoading(false),
      });
    }
  });

  useEffectOnce(() => {
    fillTextPoints();
  });

  useEffectOnce(() => {
    const cancelId = setInterval(
      () => addRocket(fireBomElemRef.current!),
      2000,
    );
    bomRender(fireBomElemRef.current!);
    return () => clearInterval(cancelId);
  });

  useEffectOnce(() => {
    starsRender(starsElemRef.current!, Math.floor(window.innerWidth * 0.216));
  });

  return (
    <main
      className="main-bg"
      ref={mainElemRef as Ref<HTMLElement>}
      style={{ backgroundImage: `url(${skybg})` }}
    >
      {loading && <Load />}
      <div
        className="bg-starry-sky"
        ref={containerRef as Ref<HTMLDivElement>}
        style={{ display: loading ? 'none' : 'block' }}
      >
        <canvas
          className="bg-fire-bom"
          ref={fireBomElemRef as Ref<HTMLCanvasElement>}
        />
        <canvas
          className="bg-fire-bom"
          ref={starsElemRef as Ref<HTMLCanvasElement>}
        />
      </div>
    </main>
  );
}

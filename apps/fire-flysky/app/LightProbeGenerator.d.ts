import type { CubeTexture, LightProbe, WebGLCubeRenderTarget } from 'three';
import type { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';

export namespace LightProbeGenerator {
  function fromCubeTexture(cubeTexture: CubeTexture): LightProbe;
  function fromCubeRenderTarget(
    renderer: WebGLRenderer,
    cubeRenderTarget: WebGLCubeRenderTarget,
  ): LightProbe;
}

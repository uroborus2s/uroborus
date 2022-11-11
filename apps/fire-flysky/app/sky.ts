import * as THREE from 'three';
import moonpng from './images/moon.jpg';
import normalpng from './images/normal.jpg';
import skypng from './images/star/sky.png';
import sk1 from './images/star/sk1.jpg';
import sk2 from './images/star/sk2.jpg';
import sk3 from './images/star/sk3.jpg';
import sk4 from './images/star/sk4.jpg';
import sk5 from './images/star/sk5.jpg';
import sk6 from './images/star/sk6.jpg';
import sk7 from './images/star/sk7.jpg';

import type { Texture } from 'three/src/textures/Texture';
import { OrbitControls } from '~/OrbitControls';
import { normFragShader, normVertShader } from './normal';
import type { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import type { Scene } from 'three/src/scenes/Scene';
import type { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import cloudpng from './images/cloud.png';
import starflake1 from './images/starflake1.png';
import starflake2 from './images/starflake2.png';
import { getTextPoint } from '~/classes/text';

let depth = 1400;

const light = {
  speed: 0.1,
  distance: 1000,
  position: new THREE.Vector3(0, 0, 0),
  orbit: function (center: THREE.Vector3, time: number) {
    this.position.x = (center.x + this.distance) * Math.sin(time * -this.speed);

    this.position.z = (center.z + this.distance) * Math.cos(time * this.speed);
  },
};

export function createLight() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // 右下角点光源
  const light_rightBottom = new THREE.PointLight(0x0655fd, 5, 0);
  light_rightBottom.position.set(0, 100, -200);
  scene.add(light_rightBottom);
  scene.add(ambientLight);
}

function createMoon(textureMap: Texture, normalMap: Texture) {
  const radius = 30;
  const xSegments = 32;
  const ySegments = 32;
  //球体
  const geo = new THREE.SphereGeometry(radius, xSegments, ySegments);

  //材质
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      lightPosition: {
        value: light.position,
      },
      textureMap: {
        value: textureMap,
      },
      normalMap: {
        value: normalMap,
      },
      uvScale: {
        value: new THREE.Vector2(1.0, 1.0),
      },
    },
    vertexShader: normVertShader,
    fragmentShader: normFragShader,
  });

  //月球模型
  const moon = new THREE.Mesh(geo, mat);
  moon.geometry.computeTangents();
  moon.position.set(0, 0, 0);
  moon.rotation.set(0, 180, 0);

  const Sphere_Group = new THREE.Group();
  Sphere_Group.add(moon);
  Sphere_Group.position.x = 500;
  Sphere_Group.position.y = 250;
  Sphere_Group.position.z = -700;
  scene.add(Sphere_Group);
  return Sphere_Group;
}

export function createSkybox(textues: Texture) {
  const material = new THREE.MeshBasicMaterial({
    map: textues,
    side: THREE.BackSide,
  });

  const geo = new THREE.BoxGeometry(
    window.innerWidth,
    window.innerHeight,
    depth,
  );
  const sky = new THREE.Mesh(geo, material);
  scene.add(sky);
  return sky;
}

function createCloud(
  textues: Texture,
  geometryWidth: number,
  geometryHeigh: number,
) {
  const clondGeometry = new THREE.PlaneGeometry(geometryWidth, geometryHeigh);

  const clondMaterial = new THREE.MeshBasicMaterial({
    map: textues,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
  });
  const cloud = new THREE.Mesh(clondGeometry, clondMaterial);
  scene.add(cloud);
  return cloud;
}

function createTube(route: any) {
  const curve = new THREE.CatmullRomCurve3(route, false);
  const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false);
  const tubeMaterial = new THREE.MeshBasicMaterial({
    // color: '0x4488ff',
    opacity: 0,
    transparent: true,
  });
  const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tube);
  return curve;
}

function createCloudMove(options: any) {
  const {
    route,
    textues,
    geometryWidth,
    geometryHeigh,
    speed,
    scaleSpeed = 0.0006,
    maxScale = 1,
    startScale = 0,
  } = options || {};
  const cloud = createCloud(textues, geometryWidth, geometryHeigh);
  const curve = createTube(route);
  let cloudProgress = 0;
  let start = startScale;
  return () => {
    if (start < maxScale) {
      start += scaleSpeed;
      cloud.scale.setScalar(start);
    }
    if (cloudProgress > 1) {
      cloudProgress = 0;
      start = 0;
    } else {
      cloudProgress += speed;
      if (curve) {
        const point = curve.getPoint(cloudProgress);
        if (point && point.x) {
          cloud.position.set(point.x, point.y, point.z);
        }
      }
    }
  };
}

let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let scene: Scene;
let group: THREE.Group;

function creatCamera(zAxisNumber: number) {
  const fov = 12;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 1;
  const far = 30000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, zAxisNumber);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function creatScene() {
  scene = new THREE.Scene();
  // 在场景中添加雾的效果，Fog参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
  scene.fog = new THREE.Fog(0x000000, 0, 10000);
  group = new THREE.Group();
  scene.add(group);
}

function creatRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
  });
  // 定义渲染器的尺寸；在这里它会填满整个屏幕
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function creatStarts(text: string, x: number, y: number) {
  if (star1 && star2) {
    const points = getTextPoint(text, x, y);
    const geometry = new THREE.BufferGeometry();
    const ps: number[] = [];
    points.forEach((p) => {
      ps.push(p.x, p.y, 0);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(ps, 3));
    const materials = new THREE.PointsMaterial({
      size: 100,
      map: [star1, star2][Math.floor(Math.random() * 2)],
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
    });
    const color = [
      { h: 0.6, s: 100, l: 0.75 },
      { h: 0, s: 0, l: 1 },
    ][Math.floor(Math.random() * 2)];
    materials.color.setHSL(color.h, color.s, color.l);
    const particles = new THREE.Points(geometry, materials);
    particles.rotation.x = Math.random() * 0.2 - 0.15;
    particles.rotation.z = Math.random() * 0.2 - 0.15;
    particles.rotation.y = Math.random() * 0.2 - 0.15;
    particles.position.z = 0;
    return particles;
  }
}

let star1: Texture;
let star2: Texture;

function threeInit(options: AnimateParameters) {
  const { container, moon, cloudMove } = options;

  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.rotateSpeed = 0.5;
  // controls.minDistance = 5;
  // controls.enablePan = false;
  controls.enabled = false;

  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    light.orbit(moon.position, clock.getElapsedTime());
    moon.rotateY(0.002);
    if (Array.isArray(cloudMove))
      cloudMove.forEach((move) => {
        if (typeof move === 'function') move();
      });

    controls.update();
    renderer.render(scene, camera);
  };
  return { animate };
}

type PathKey = 'moon' | 'moonNormal' | 'starSkys';

function loadAssets(options: {
  paths: {
    moon: string;
    moonNormal: string;
    starSkys: string;
    cloud: string;
    starflake1: string;
    starflake2: string;
  };
  onBegin: () => void;
  onProgress: (event: { name: string }) => void;
  onComplete: (event: { textures: Record<string, Texture> }) => void;
}) {
  const { paths, onBegin, onProgress, onComplete } = options;
  let total = 0;
  let completed = 0;

  const textures: Record<string, Texture> = {};

  for (let key in paths) if (paths.hasOwnProperty(key)) total++;

  onBegin();

  const getOnload = (path: string | string[], name: PathKey) => {
    return (texture: Texture) => {
      textures[name] = texture;
      completed++;
      if (typeof onProgress === 'function') {
        onProgress({
          name: name,
        });
      }
      if (completed === total && typeof onComplete === 'function') {
        onComplete({
          textures: textures,
        });
      }
    };
  };

  for (let key in paths) {
    if (paths.hasOwnProperty(key)) {
      const path = paths[key as PathKey];
      if (typeof path === 'string')
        new THREE.TextureLoader().load(path, getOnload(path, key as PathKey));
      else if (typeof path === 'object')
        new THREE.CubeTextureLoader().load(
          path,
          getOnload(path, key as PathKey),
        );
    }
  }
}

export interface LoadParameters {
  container: HTMLDivElement;
  hud?: HTMLDivElement;
  setLoading: () => void;
}

export interface AnimateParameters extends LoadParameters {
  moon: THREE.Group;
  starSky: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  cubeTexture: THREE.CubeTexture;
  cloudMove: (() => void)[];
}

export function bgRender(parameters: LoadParameters) {
  creatRenderer();
  const distance = window.innerWidth / 2 / Math.tan(Math.PI / 12);
  const zAxisNumber = Math.floor(distance - depth / 2);
  creatCamera(zAxisNumber);
  creatScene();
  createLight();
  loadAssets({
    paths: {
      moon: moonpng,
      moonNormal: normalpng,
      starSkys: skypng,
      cloud: cloudpng,
      starflake1: starflake1,
      starflake2: starflake2,
    },
    onBegin: () => {},
    onProgress: (event) => {},
    onComplete: (event) => {
      const textures = event.textures;
      const moon = createMoon(textures.moon, textures.moonNormal);
      const starSky = createSkybox(textures.starSkys);
      const cMove = createCloudMove({
        route: [
          new THREE.Vector3(
            window.innerWidth / 4,
            window.innerHeight / 4,
            -depth / 2,
          ),
          new THREE.Vector3(
            window.innerWidth / 4,
            window.innerHeight / 4,
            zAxisNumber,
          ),
        ],
        textues: textures.cloud,
        geometryWidth: 200,
        geometryHeigh: 100,
        speed: 0.0005,
      });

      const cMove1 = createCloudMove({
        route: [
          new THREE.Vector3(-window.innerWidth / 10, 200, -depth / 2),
          new THREE.Vector3(-window.innerWidth / 4, window.innerHeight / 8, 0),
          new THREE.Vector3(-window.innerWidth / 4, 200, zAxisNumber),
        ],
        textues: textures.cloud,
        geometryWidth: 400,
        geometryHeigh: 200,
        speed: 0.0002,
        scaleSpeed: 0.0008,
      });
      star1 = textures.starflake1;
      star2 = textures.starflake1;

      const { animate } = threeInit({
        ...parameters,
        moon,
        starSky,
        cubeTexture: textures.starSkys as THREE.CubeTexture,
        cloudMove: [cMove, cMove1],
      });

      setInterval(() => {
        const material = starSky.material;
        material.map = new THREE.TextureLoader().load(
          [skypng, sk1, sk2, sk3, sk4, sk5, sk6, sk7][
            Math.floor(Math.random() * 8)
          ],
        );
        material.needsUpdate = true;
      }, 20000);
      animate();

      setTimeout(parameters.setLoading, 5000);
    },
  });
}

export function onWindowResize() {
  if (renderer && camera) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

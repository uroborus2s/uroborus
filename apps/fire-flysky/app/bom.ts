import type { Point } from '~/classes';
import { Particle, Rocket, Time, Trail } from '~/classes';
import { TextTrail } from '~/classes/textTrail';
import { textParticles } from '~/classes/text';

const time = new Time();
let rockets: Rocket[] = [];

const getTrustParticleFactory = function () {
  function getColor() {
    const hue = Math.floor(Math.random() * 15 + 30);
    return `hsl(${hue}, 100%, 75%`;
  }

  return function (parent: Trail) {
    const position = parent.position.clone();
    const velocity = parent.velocity.clone().multiplyScalar(-0.1);
    velocity.x += (Math.random() - 0.5) * 8;
    const color = getColor();
    const radius = 1 + Math.random();
    const lifetime = 0.5 + Math.random() * 0.5;
    const mass = 0.01;

    const particle = new Particle(color, radius, lifetime, mass);
    particle.initialize(position.x, position.y, velocity.x, velocity.y);
    return particle;
  };
};

const getTextExplosionFactory = (baseHue: number) => {
  function getColor() {
    const hue = Math.floor(baseHue + Math.random() * 15) % 360;
    const lightness = Math.floor(Math.pow(Math.random(), 2) * 50 + 50);
    return `hsl(${hue}, 100%, ${lightness}%`;
  }

  function getChildFactory() {
    return function (parent: Trail) {
      const direction = Math.random() * Math.PI * 2;
      const force = 8;
      const color = getColor();
      const radius = 1 + Math.random();
      const lifetime = 0.1;
      const mass = 0;

      const { position, velocity } = parent;

      const particle = new Particle(color, radius, lifetime, mass);
      particle.initialize(
        position.x,
        position.y,
        (velocity.x - position.x)*6,
        (velocity.y - position.y)*6,
      );
      return particle;
    };
  }

  function getTextTrail(position: Point, velocity: Point) {
    const direction = Math.random() * Math.PI * 2;
    const force = Math.random() * 128;

    const lifetime = 0.5 + Math.random();
    const mass = 0.075;

    const textTrail = new TextTrail(getChildFactory(), lifetime, mass);
    textTrail.initialize(position.x, position.y, velocity.x, velocity.y);

    return textTrail;
  }

  return function (parent: Rocket) {
    const tps = textParticles[Math.floor(Math.random() * 3)];
    for (const particles of tps) {
      parent.children.push(
        getTextTrail(
          parent.position.clone(),
          particles.clone().add(parent.position),
        ),
      );
    }
  };
};

const getExplosionFactory = function (baseHue: number) {
  function getColor() {
    const hue = Math.floor(baseHue + Math.random() * 15) % 360;
    const lightness = Math.floor(Math.pow(Math.random(), 2) * 50 + 50);
    return `hsl(${hue}, 100%, ${lightness}%`;
  }

  function getChildFactory() {
    return function (parent: Trail) {
      const direction = Math.random() * Math.PI * 2;
      const force = 8;
      const color = getColor();
      const radius = 1 + Math.random();
      const lifetime = 1;
      const mass = 0.1;

      const particle = new Particle(color, radius, lifetime, mass);
      particle.initialize(
        parent.position.x,
        parent.position.y,
        Math.cos(direction) * force,
        Math.sin(direction) * force,
      );
      return particle;
    };
  }

  function getTrail(position: Point) {
    const direction = Math.random() * Math.PI * 2;
    const force = Math.random() * 128;

    const lifetime = 0.5 + Math.random();
    const mass = 0.075;

    const trail = new Trail(getChildFactory(), lifetime, mass);
    trail.initialize(
      position.x,
      position.y,
      Math.cos(direction) * force,
      Math.sin(direction) * force,
    );

    return trail;
  }

  return function (parent: Rocket) {
    let trails = 32;
    while (trails--) {
      parent.children.push(getTrail(parent.position.clone()));
    }
  };
};

export const addRocket = function (canvas: HTMLCanvasElement) {
  const trustParticleFactory = getTrustParticleFactory();
  const text = textParticles.length === 0 ? 0 : Math.random() < 0.5 ? 0 : 1;
  const explosionFactory =
    text === 0
      ? getExplosionFactory(Math.random() * 360)
      : getTextExplosionFactory(Math.random() * 360);

  const thrust = window.innerHeight * 0.75;
  const angle = Math.PI / -2 + ((Math.random() - 0.5) * Math.PI) / 8;

  const rocket = new Rocket(trustParticleFactory, explosionFactory);
  rocket.initialize(
    Math.random() * canvas.width,
    canvas.height,
    Math.cos(angle) * thrust,
    Math.sin(angle) * thrust,
  );
  rockets.push(rocket);

  rockets = rockets.filter(function (rocket) {
    return rocket.isAlive;
  });
};

export const bomRender = function (canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  const animate = () => {
    requestAnimationFrame(animate);
    time.update();
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      rockets.forEach(function (rocket) {
        rocket.update(time);
        rocket.render(context);
      });
    }
  };
  animate();
};

export const onBomResize = function (canvas: HTMLCanvasElement) {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

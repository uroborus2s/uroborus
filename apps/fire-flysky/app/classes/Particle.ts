import { Point, settings, Time } from '~/classes';

export class Particle {
  public position: Point;
  public velocity: Point;
  private acceleration: Point;
  public age: number;
  private readonly createdOn: number;
  protected lifetime: number;
  private readonly radius: number;
  private readonly mass: number;
  private readonly color: string;
  private isInCanvas: boolean;
  public static GRAVITATION = new Point(0, 9.81);

  constructor(color = 'white', radius = 1, lifetime = 1, mass = 1) {
    this.position = new Point();
    this.velocity = new Point();
    this.acceleration = new Point();
    this.age = 0;
    this.radius = radius;
    this.lifetime = lifetime;
    this.mass = mass;
    this.color = color;
    this.isInCanvas = true;
    this.createdOn = Time.now();
  }

  public initialize(x: number, y: number, dx: number, dy: number) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * settings.particles.effect;
    this.acceleration.y = dy * settings.particles.effect;
    this.age = 0;
  }

  public update(deltaTime: number | Time) {
    if (typeof deltaTime === 'number') {
      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;
      this.velocity.x += this.acceleration.x * deltaTime;
      this.velocity.y += this.acceleration.y * deltaTime;
      this.age += deltaTime;
    } else if (deltaTime instanceof Time) {
      if (!this.getRemainingLifetime()) {
        return;
      }

      this.velocity.add(Particle.GRAVITATION.clone().multiplyScalar(this.mass));
      this.position.add(
        this.velocity.clone().multiplyScalar((deltaTime as Time).delta),
      );
    }
  }

  public draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    function ease(t: number) {
      return --t * t * t + 1;
    }
    const size = image.width * ease(this.age / settings.particles.duration);
    context.globalAlpha = 1 - this.age / settings.particles.duration;
    context.drawImage(
      image,
      this.position.x - size / 2,
      this.position.y - size / 2,
      size,
      size,
    );
  }

  public getRemainingLifetime() {
    const elapsedLifetime = Time.now() - this.createdOn;
    return Math.max(0, this.lifetime - elapsedLifetime) / this.lifetime;
  }

  render(context: CanvasRenderingContext2D) {
    const remainingLifetime = this.getRemainingLifetime();

    if (!remainingLifetime) return;

    const radius = this.radius * remainingLifetime;

    context.globalAlpha = remainingLifetime;
    context.globalCompositeOperation = 'lighter';
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.position.x, this.position.y, radius, 0, Math.PI * 2);
    context.fill();
  }
}

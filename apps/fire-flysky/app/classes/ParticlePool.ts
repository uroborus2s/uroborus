import { Particle, settings, textImg } from '~/classes';

export class ParticlePool {
  private readonly particles: Array<Particle>;
  private firstFree: number;
  private firstActive: number;
  private duration = settings.particles.duration;

  constructor(length: number) {
    this.firstFree = 0;
    this.firstActive = 0;
    this.particles = new Array(length);
    for (let i = 0; i < length; i++) {
      this.particles[i] = new Particle();
    }
  }

  public add(x: number, y: number, dx: number, dy: number) {
    this.particles[this.firstFree].initialize(x, y, dx, dy);
    this.firstFree++;

    if (this.firstFree === this.particles.length) this.firstFree = 0;
    if (this.firstActive === this.firstFree) this.firstActive++;
    if (this.firstActive === this.particles.length) this.firstActive = 0;
  }

  public update(deltaTime: number) {
    // update active particles
    if (this.firstActive < this.firstFree) {
      for (let i = this.firstActive; i < this.firstFree; i++)
        this.particles[i].update(deltaTime);
    }
    if (this.firstFree < this.firstActive) {
      for (let i = this.firstActive; i < this.particles.length; i++)
        this.particles[i].update(deltaTime);
      for (let i = 0; i < this.firstFree; i++)
        this.particles[i].update(deltaTime);
    }

    // remove inactive particles
    while (
      this.particles[this.firstActive].age >= this.duration &&
      this.firstActive != this.firstFree
    ) {
      this.firstActive++;
      if (this.firstActive == this.particles.length) this.firstActive = 0;
    }
  }

  public draw(context: CanvasRenderingContext2D, document: Document) {
    const imgs = [
      textImg('刘', document),
      textImg('逸', document),
      textImg('云', document),
    ];
    // draw active particles
    if (this.firstActive < this.firstFree) {
      for (let i = this.firstActive; i < this.firstFree; i++)
        this.particles[i].draw(context, imgs[Math.floor(Math.random() * 3)]);
    }
    if (this.firstFree < this.firstActive) {
      for (let i = this.firstActive; i < this.particles.length; i++)
        this.particles[i].draw(context, imgs[Math.floor(Math.random() * 3)]);
      for (let i = 0; i < this.firstFree; i++)
        this.particles[i].draw(context, imgs[Math.floor(Math.random() * 3)]);
    }
  }
}

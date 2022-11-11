import { Particle } from '~/classes/Particle';
import type { Time } from '~/classes/Time';

export type ChildFactory = (parent: Trail) => Particle;

export class Trail extends Particle {
  protected readonly childFactory: ChildFactory;
  public children: Array<Particle>;
  public isAlive: boolean;

  constructor(childFactory: ChildFactory, lifetime = 1, mass = 1) {
    super('white', 1, lifetime, mass);

    this.childFactory = childFactory;
    this.children = [];

    this.isAlive = true;
  }

  protected extinc(predicate: (value: Particle) => unknown) {
    // Add a new child on every frame
    if (this.isAlive && this.getRemainingLifetime()) {
      this.children.push(this.childFactory(this));
    }

    // Remove particles that are dead
    this.children = this.children.filter(predicate);

    // Kill trail if all particles fade away
    if (!this.children.length) {
      this.isAlive = false;
    }
  }

  update(time: Time) {
    super.update(time);

    this.extinc((child) => {
      if (child instanceof Trail) {
        return child.isAlive;
      }

      return child.getRemainingLifetime();
    });

    // Update particles
    this.children.forEach(function (child) {
      child.update(time);
    });
  }

  render(context: CanvasRenderingContext2D) {
    // Render all children
    this.children.forEach(function (child) {
      child.render(context);
    });
  }
}

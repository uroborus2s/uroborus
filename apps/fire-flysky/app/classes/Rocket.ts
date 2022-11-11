import { ChildFactory, Particle, Time, Trail } from '~/classes';

export class Rocket extends Trail {
  private readonly explosionFactory: (parent: Rocket) => void;
  constructor(
    childFactory: ChildFactory,
    explosionFactory: (parent: Rocket) => void,
  ) {
    super(childFactory, 30);

    this.explosionFactory = explosionFactory;
  }

  public update(time: Time) {
    if (this.getRemainingLifetime() && this.velocity.y > 0) {
      this.explosionFactory(this);
      this.lifetime = 0;
    }

    super.update(time);
  }
}

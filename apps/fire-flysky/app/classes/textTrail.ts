import { Trail } from '~/classes/Trail';
import { Time } from '~/classes/Time';

export class TextTrail extends Trail {
  update(time: Time) {
    this.extinc((child) => {
      if (child instanceof TextTrail) {
        return child.isAlive;
      }

      return child.getRemainingLifetime();
    });
    // Update particles
    this.children.forEach(function (child) {
      child.update(time);
    });
  }
}

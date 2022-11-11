export class Time {
  public delta: number;
  private previous: number;
  private elapsed: number;
  private readonly start: number;

  constructor() {
    const now = Time.now();

    this.delta = 0;
    this.elapsed = 0;
    this.start = now;
    this.previous = now;
  }

  update() {
    const now = Time.now();

    this.delta = now - this.previous;
    this.elapsed = now - this.start;
    this.previous = now;
  }

  static now() {
    return Date.now() / 1000;
  }
}

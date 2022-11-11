export class Point {
  public x: number;
  public y: number;

  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone() {
    return new Point(this.x, this.y);
  }

  public add(p: Point) {
    this.x += p.x;
    this.y += p.y;
    return this;
  }

  public multiplyScalar(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  public length(length?: number): Point | number {
    if (typeof length == 'undefined')
      return Math.sqrt(this.x * this.x + this.y * this.y);
    this.normalize();
    this.x *= length;
    this.y *= length;
    return this;
  }

  public normalize() {
    const length = this.length() as number;
    this.x /= length;
    this.y /= length;
    return this;
  }
}

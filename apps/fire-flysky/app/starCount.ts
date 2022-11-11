import { onBomResize } from '~/bom';
import { Point } from '~/classes';

const speedCoeff = 0.05;
let width: number;
let height: number;
let circleRadius: number;
let circleCenter: Point;
let first = true;
let giantColor = '180,184,240';
let starColor = '226,225,142';
let cometColor = '226,225,224';
const stars: Star[] = [];

export const starsRender = (canvas: HTMLCanvasElement, starCount: number) => {
  const context = canvas.getContext('2d');

  if (context) {
    for (let i = 0; i < starCount; i++) {
      stars[i] = new Star();
    }

    const animate = () => {
      context.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.move();
        star.fadeIn();
        star.fadeOut();
        star.draw(context);
      });

      window.requestAnimationFrame(animate);
    };

    animate();
  }
};

export const onStarResize = function (canvas: HTMLCanvasElement) {
  onBomResize(canvas);
  width = window.innerWidth;
  height = window.innerHeight;
  circleRadius = width > height ? height / 2 : width / 2;
  circleCenter = new Point(width / 2, height / 2);
};

export class Star extends Point {
  private giant: number = 0;
  private comet: number = 0;
  private r: number = 0;
  private dx: number = 0;
  private dy: number = 0;
  private opacity: number = 0;
  private do: number = 0;
  private opacityTresh: number = 0;
  private fadingOut: boolean = false;
  private fadingIn: boolean = false;

  constructor() {
    super();
    this.reset();
  }

  public reset() {
    this.giant = Star.getProbability(3);
    this.comet = this.giant || first ? 0 : Star.getProbability(10);
    this.set(
      Star.getRandInterval(0, width - 10),
      Star.getRandInterval(0, height),
    );

    this.r = Star.getRandInterval(1.1, 2.6);
    this.dx =
      Star.getRandInterval(speedCoeff, 6 * speedCoeff) +
      (this.comet + 1 - 1) * speedCoeff * Star.getRandInterval(50, 120) +
      speedCoeff * 2;
    this.dy =
      -Star.getRandInterval(speedCoeff, 6 * speedCoeff) -
      (this.comet + 1 - 1) * speedCoeff * Star.getRandInterval(50, 120);
    this.fadingOut = false;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = Star.getRandInterval(
      0.2,
      1 - (this.comet + 1 - 1) * 0.4,
    );
    this.do =
      Star.getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * 0.001;
  }

  public fadeIn() {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  }

  public fadeOut() {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath();

    if (this.giant) {
      context.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
      context.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      context.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
      context.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (let i = 0; i < 30; i++) {
        context.fillStyle =
          'rgba(' +
          cometColor +
          ',' +
          (this.opacity - (this.opacity / 20) * i) +
          ')';
        context.rect(
          this.x - (this.dx / 4) * i,
          this.y - (this.dy / 4) * i - 2,
          2,
          2,
        );
        context.fill();
      }
    } else {
      context.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
      context.rect(this.x, this.y, this.r, this.r);
    }

    context.closePath();
    context.fill();
  }

  public move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > width - width / 4 || this.y < 0) {
      this.fadingOut = true;
    }
  }

  public static getProbability(percents: number) {
    return Number(Math.floor(Math.random() * 1000) + 1 < percents * 10);
  }

  public static getRandInterval(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}

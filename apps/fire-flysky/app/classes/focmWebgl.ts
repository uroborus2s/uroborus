import THREE from 'three';

function animate(fnCallbacke: (progress: {}) => void) {
  const tick = (timestamp: number) => {
    const time = Math.min(duration, timestamp - startTime);
    const position = easingFunction(time, begin, change, duration);
    fn(position, time);

    if (time === duration) {
      if (isRoop) {
        startTime = timestamp;
        requestAnimationFrame(tick);
      } else {
        onAfter && onAfter();
      }
    } else {
      requestAnimationFrame(tick);
    }
  };
}

const mrfc: any = {};

export class Controller {
  addData() {}
}

export class FocmWebgl {
  private root: any;
  constructor() {
    mrfc.initialRatio = 1;
  }

  public setSize() {
    const clientWidth = (mrfc.clientWidth = this.root.canvas.clientWidth);
    const clientHeight = (mrfc.clientHeight = this.root.canvas.clientHeight);
    mrfc.clientHalfWidth = clientWidth / 2;
    mrfc.clientHalfHeight = clientHeight / 2;
    mrfc.resolution = new THREE.Vector2(clientWidth, clientHeight);
    mrfc.ratio = clientWidth / clientHeight;
  }

  public start() {
    const period = Math.PI * 3;
    const amplitude = Math.min(Math.max(mrfc.clientWidth * 0.1, 100), 180);
    animate(
      function (progress) {
        _this2.shootingStar.draw({
          clientX: Math.cos(progress * period) * amplitude,
          clientY:
            (progress * $mrfc$export$default.clientHeight -
              $mrfc$export$default.clientHalfHeight) *
            1.3,
        });
      },
      {
        duration: $Focm$var$FIRST_DURATION,
        onAfter: function onAfter() {
          _this2.shootingStar.draw({
            clientX: -$mrfc$export$default.clientHalfWidth,
            clientY:
              $mrfc$export$default.clientHeight -
              $mrfc$export$default.clientHalfHeight,
          });

          _this2.shootingStar.draw({
            clientX: -$mrfc$export$default.clientHalfWidth * 1.1,
            clientY: 0,
          });

          setTimeout(function () {
            _this2.textStart();
          }, 300);
        },
      },
    );
  }
}

export interface THREERootParams {
  speed?: number;
  interval: number;
  firstTime?: number;
}

export class THREERoot {
  private speed;
  private interval;
  private readonly firstTime;
  private time;
  private stopTime;

  constructor(params: THREERootParams) {
    this.speed = params.speed ?? 60 / 1000;
    this.interval = params.interval;
    this.firstTime = params.firstTime ?? 0;
    this.time = this.firstTime;
    this.stopTime = 0;
  }
}

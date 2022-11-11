export interface Easing {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
}

export interface Duration {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
}

export interface Transitions {
  easing: Easing;
  duration: Duration;
  create: CreateFunction;
  getAutoHeightDuration: typeof getAutoHeightDuration;
}

type CreateFunction = (
  props: string | string[],
  options?: Partial<{
    duration: number | string;
    easing: string;
    delay: number | string;
  }>,
) => string;

export interface TransitionsOptions {
  easing?: Partial<Easing>;
  duration?: Partial<Duration>;
  create?: CreateFunction;
  getAutoHeightDuration?: (height: number) => number;
}

export const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

export const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195,
};

function formatMs(milliseconds: number) {
  return `${Math.round(milliseconds)}ms`;
}

export function getAutoHeightDuration(height: number): number {
  if (!height) {
    return 0;
  }

  const constant = height / 36;

  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export default function (transOptions: TransitionsOptions) {
  const mergedEasing = { ...easing, ...transOptions.easing };

  const mergedDuration = { ...duration, ...transOptions.duration };

  const create: CreateFunction = (props = ['all'], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0,
      ...other
    } = options;

    return (Array.isArray(props) ? props : [props])
      .map(
        (animatedProp) =>
          `${animatedProp} ${
            typeof durationOption === 'string'
              ? durationOption
              : formatMs(durationOption)
          } ${easingOption} ${
            typeof delay === 'string' ? delay : formatMs(delay)
          }`,
      )
      .join(',');
  };
  return {
    getAutoHeightDuration,
    create,
    ...transOptions,
    easing: mergedEasing,
    duration: mergedDuration,
  };
}

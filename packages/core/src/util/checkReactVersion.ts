import type { Logger } from '../logger/index.js';

import { invariant } from './invariant.js';

interface Version {
  major: number;
  minor: number;
  patch: number;
  raw: string;
}

// We can use a simple regex here given that:
// - the version that react supplies is always full: eg 16.5.2
// - our peer dependency version is to a full version (eg ^16.3.1)
const semver = /(\d+)\.(\d+)\.(\d+)/;
const getVersion = (value: string): Version => {
  const result = semver.exec(value);

  invariant(result != null, `Unable to parse React version ${value}`);

  const major = Number(result![1]);
  const minor = Number(result![2]);
  const patch = Number(result![3]);

  return {
    major,
    minor,
    patch,
    raw: value,
  };
};

const isSatisfied = (expected: Version, actual: Version) => {
  if (actual.major > expected.major) {
    return true;
  }

  if (actual.major < expected.major) {
    return false;
  }

  // major is equal, continue on

  if (actual.minor > expected.minor) {
    return true;
  }

  if (actual.minor < expected.minor) {
    return false;
  }

  // minor is equal, continue on

  return actual.patch >= expected.patch;
};

export default (peerDepValue: string, actualValue: string, logger: Logger) => {
  const peerDep: Version = getVersion(peerDepValue);
  const actual: Version = getVersion(actualValue);

  if (isSatisfied(peerDep, actual)) {
    return;
  }

  logger.warn(`
    React version: [${actual.raw}]
    不满足预期的依赖版本: [${peerDep.raw}]

    这可能会导致运行时错误，甚至是致命的崩溃
  `);
};

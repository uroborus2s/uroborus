class test {
  private t: number;

  public constructor() {
    this.t = 1;
  }
}

function getFunctionName(funcConstructor: any) {
  console.log(funcConstructor.name);
  console.log(funcConstructor.toString());
  console.log(funcConstructor);

  // for every other browser in the world
  if (funcConstructor.name) {
    return funcConstructor.name;
  }
  console.log(funcConstructor.toString());
  // for the pestilence that is ie11
  const matches = /function\s+([^(]+)/.exec(funcConstructor.toString());
  return matches && matches.length === 2 ? matches[1].trim() : null;
}

const funcConstructor = Object.getPrototypeOf(test).constructor;
const matches = /function\s+([^(]+)/.exec(funcConstructor.toString());
console.log([...matches!]);

console.log(funcConstructor);
console.log(funcConstructor.toString());

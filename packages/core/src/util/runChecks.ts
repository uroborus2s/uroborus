const runChecks = <Args extends {}>(
  args: Args,
  checkFns: ((args: Args) => void)[],
) => {
  checkFns.forEach((checkFn) => checkFn(args));
};

export default runChecks;
